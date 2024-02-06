import OpenAI from "openai";

export const configuration = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
