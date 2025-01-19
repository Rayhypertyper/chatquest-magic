import { Groq } from "groq-sdk";

interface Question {
  question: string;
  options: { text: string; correct: boolean; }[];
}

export const generateQuestion = async (): Promise<Question> => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const prompt = `Generate a multiple choice question with 4 options. Return it in this exact JSON format:
  {
    "question": "the question text",
    "options": [
      {"text": "option 1", "correct": false},
      {"text": "option 2", "correct": true},
      {"text": "option 3", "correct": false},
      {"text": "option 4", "correct": false}
    ]
  }
  Make sure exactly one option is marked as correct.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "mixtral-8x7b-32768",
  });

  const response = completion.choices[0]?.message?.content;
  if (!response) throw new Error("Failed to generate question");

  return JSON.parse(response);
};