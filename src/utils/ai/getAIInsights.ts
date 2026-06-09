// utils/ai/getAIInsights.ts

export interface AIInsights {
  rawPathInsight: string;
  lifePathDeepDive: string;
  birthdayInsight: string;
  birthdayDeepDive: string;
  ascendantMessage: string;
  karmaMessage: string;
  soulLesson: string;
}

interface Params {
  lifePathRaw: string;
  lifePath?: number;
  birthdayNumber: number;
  ascendant?: any;
  sunSign?: string;
  dominantHouse?: number;
  moonNakshatra?: string;
}

async function fetchGPTInsights(prompt: string): Promise<Partial<AIInsights> | null> {
  try {
    const response = await fetch('/api/gpt-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) throw new Error('GPT failed');

    const data = await response.json();
    return data.insights;
  } catch (err) {
    console.warn('Fallback to basic AIInsights:', err);
    return null;
  }
}

export default async function getAIInsights(params: Params): Promise<AIInsights> {
  const { lifePathRaw, birthdayNumber, ascendant, sunSign, dominantHouse, moonNakshatra } = params;

  const prompt = `Provide a deep numerological interpretation with the following sections:

1. Raw Life Path Insight
Summarize Life Path ${lifePathRaw} in general terms.

2. Life Path Deep Dive
Decompose ${lifePathRaw} into its digits and master number (if any).
Explain the influence of each digit (e.g. 3, 8 in 38) and the master number 11.
List strengths, weaknesses, and greatest challenges.

3. Birthday Insight
Summarize Birthday Number ${birthdayNumber} in general terms.

4. Birthday Deep Dive
Break ${birthdayNumber} into components (e.g. 1 + 7 = 8).
Analyze the meaning of 1, 7, and the result 8.
Discuss karma, talents, and development areas.

5. Ascendant Message
Use ascendant sign ${ascendant?.ascSign} and nakshatra ${ascendant?.nakshatra}.

6. Karma Message
Interpret dominant house ${dominantHouse}.

7. Soul Lesson
Base on Moon Nakshatra: ${moonNakshatra}.
Use detailed and human-like tone.`;

  const gptResult = await fetchGPTInsights(prompt);

  return {
    rawPathInsight: gptResult?.rawPathInsight ?? '',
    lifePathDeepDive: gptResult?.lifePathDeepDive ?? '',
    birthdayInsight: gptResult?.birthdayInsight ?? '',
    birthdayDeepDive: gptResult?.birthdayDeepDive ?? '',
    ascendantMessage: gptResult?.ascendantMessage ?? '',
    karmaMessage: gptResult?.karmaMessage ?? '',
    soulLesson: gptResult?.soulLesson ?? ''
  };
}