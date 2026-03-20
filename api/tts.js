// Vercel serverless function: POST /api/tts
// Body: { text, voice?, apiKey? }   Returns WAV audio binary

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text, voice, apiKey: clientKey } = req.body;
    const key = process.env.OPENROUTER_API_KEY || clientKey;
    if (!key) return res.status(401).json({ error: 'No API key.' });
    if (!text) return res.status(400).json({ error: 'text is required.' });

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://poetrymap.vercel.app',
                'X-Title': 'Poetrymap',
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o-audio-preview',
                modalities: ['text', 'audio'],
                audio: { voice: voice || 'alloy', format: 'pcm16' },
                stream: true,
                messages: [
                    { role: 'user', content: `Read the following text aloud exactly as written:\n\n${text}` },
                ],
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`TTS: ${response.status} ${errText}`);
        }

        // Parse SSE stream, collect base64 audio chunks
        const raw = await response.text();
        let audioB64 = '';
        for (const line of raw.split('\n')) {
            if (!line.startsWith('data: ') || line.includes('[DONE]')) continue;
            try {
                const chunk = JSON.parse(line.slice(6));
                const delta = chunk.choices?.[0]?.delta;
                if (delta?.audio?.data) audioB64 += delta.audio.data;
            } catch {}
        }

        if (!audioB64) throw new Error('No audio data in response.');

        // Wrap raw PCM16 in a WAV header (mono, 24kHz, 16-bit)
        const pcm = Buffer.from(audioB64, 'base64');
        const sampleRate = 24000;
        const numChannels = 1;
        const bitsPerSample = 16;
        const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
        const blockAlign = numChannels * (bitsPerSample / 8);
        const wavHeader = Buffer.alloc(44);
        wavHeader.write('RIFF', 0);
        wavHeader.writeUInt32LE(36 + pcm.length, 4);
        wavHeader.write('WAVE', 8);
        wavHeader.write('fmt ', 12);
        wavHeader.writeUInt32LE(16, 16);
        wavHeader.writeUInt16LE(1, 20);
        wavHeader.writeUInt16LE(numChannels, 22);
        wavHeader.writeUInt32LE(sampleRate, 24);
        wavHeader.writeUInt32LE(byteRate, 28);
        wavHeader.writeUInt16LE(blockAlign, 32);
        wavHeader.writeUInt16LE(bitsPerSample, 34);
        wavHeader.write('data', 36);
        wavHeader.writeUInt32LE(pcm.length, 40);
        const audioBuffer = Buffer.concat([wavHeader, pcm]);

        res.setHeader('Content-Type', 'audio/wav');
        res.setHeader('Content-Length', audioBuffer.length);
        res.send(audioBuffer);
    } catch (err) {
        console.error('TTS error:', err.message);
        res.status(500).json({ error: err.message });
    }
};
