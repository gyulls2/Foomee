'use server';

import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatResponse(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            '당신은 영양 전문가입니다. 주어진 식단을 분석하여 영양 성분, 균형, 건강에 대한 평가를 제공하고, 필요할 경우 개선 사항을 제시하세요. 답변은 한국어로 제공하세요.',
        },
        { role: 'user', content: prompt },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching from OpenAI:', error);
  }
}
