import { configuration } from "@/utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type Data = {
  result: string;
};

const openai = new OpenAI();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a marketing expert, and a customer approaches you to write a very short and exciting marketing copy for them. Come up with a short marketing copy on topic: ${input}.`,
      },
    ],
    temperature: 0.85,
    max_tokens: 40,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const suggestion = response.choices[0].message.content;
  if (suggestion === null) throw new Error("No suggestion found");
  res.status(200).json({ result: suggestion });
}
