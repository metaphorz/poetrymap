// Vercel serverless function: GET /api/tts-available

module.exports = async (req, res) => {
    res.json({ available: !!process.env.OPENROUTER_API_KEY });
};
