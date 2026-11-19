const express = require('express');
const router = express.Router();

const API_KEY = process.env.GEMINI_API_KEY || '';

// OpenRouter URL — Gemini 2.0 Flash free model
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemma-4-31b-it:free';

// POST /api/gemini/generate
router.post('/generate', async (req, res) => {
  if (!API_KEY || API_KEY.length < 10) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  try {
    // Convert Gemini format → OpenRouter/OpenAI format
    const body = req.body;
    const systemText = body?.system_instruction?.parts?.[0]?.text || '';
    const contents = body?.contents || [];
    const genConfig = body?.generationConfig || {};

    const messages = [];
    if (systemText) messages.push({ role: 'system', content: systemText });

    for (const c of contents) {
      const role = c.role === 'model' ? 'assistant' : 'user';
      const text = c.parts?.[0]?.text || '';
      messages.push({ role, content: text });
    }

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'https://sarojuniversity.edu.in',
        'X-Title': 'SIU NEET AI Mentor'
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: genConfig.temperature || 0.9,
        max_tokens: genConfig.maxOutputTokens || 700
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'API error' });
    }

    // Convert OpenAI format → Gemini format for frontend compatibility
    const text = data?.choices?.[0]?.message?.content || '';
    res.json({
      candidates: [{ content: { parts: [{ text }] } }]
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to reach AI API: ' + err.message });
  }
});

module.exports = router;
