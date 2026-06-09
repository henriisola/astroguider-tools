import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const result = await openaiRes.json();

    if (!result.choices || !result.choices.length) {
      console.error('OpenAI response missing choices:', result);
      return res.status(500).json({ error: 'OpenAI response invalid' });
    }
    
    const text = result.choices[0]?.message?.content || '';    

    // Jaa viestit osiin, esim. rivien mukaan tai regexillä
    const insights = {
      rawPathInsight: extractSection(text, 'Raw Life Path Insight'),
      birthdayInsight: extractSection(text, 'Birthday Insight'),
      ascendantMessage: extractSection(text, 'Ascendant Message'),
      karmaMessage: extractSection(text, 'Karma Message'),
      soulLesson: extractSection(text, 'Soul Lesson')
    };

    res.status(200).json({ insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI request failed' });
  }
}

function extractSection(text: string, title: string): string {
  const match = new RegExp(`${title}:\\s*(.*?)\\n`, 'i').exec(text + '\n');
  return match?.[1]?.trim() ?? '';
}
