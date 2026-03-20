require('dotenv').config({ path: require('os').homedir() + '/.env' });

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname)));

// Rate limit API endpoints: max 30 requests per IP per 10 minutes
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a few minutes and try again.' },
});
app.use('/api/', apiLimiter);

const PORT = 8222;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';

// POST /api/tts — text-to-speech via OpenRouter audio model
// Body: { text, voice?, apiKey? }   Returns WAV audio binary
app.post('/api/tts', async (req, res) => {
  const { text, voice, apiKey: clientKey } = req.body;
  const key = OPENROUTER_API_KEY || clientKey;
  if (!key) return res.status(401).json({ error: 'No API key.' });
  if (!text) return res.status(400).json({ error: 'text is required.' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:8222',
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
});

// Check if server has an API key (client uses this to show/hide premium voices)
app.get('/api/tts-available', (req, res) => {
  res.json({ available: !!OPENROUTER_API_KEY });
});

app.listen(PORT, () => {
  console.log(`Poetrymap server running at http://localhost:${PORT}`);
  if (OPENROUTER_API_KEY) {
    console.log('OpenRouter API key loaded — premium TTS voices enabled.');
  } else {
    console.log('No OpenRouter API key found — premium TTS requires client-provided key.');
  }
});
