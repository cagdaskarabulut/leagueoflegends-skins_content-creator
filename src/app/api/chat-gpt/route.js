import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request){
  
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

//Get user's input
const params = await request.json();

//Pass user's input into chat gpt
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      // content: "You have an enjoyable narrative and you are a writer who is knowledgeable about League of Legends. Please answer my questions with long and detailed explanations like an article."
      content: "You have an enjoyable narrative and you are a writer who is knowledgeable about League of Legends. Please answer my questions with long and detailed explanations, such as an article, in at least 1000 words."
    },
    {
      role: "user",
      content: params.prompt
    }
  ],
  temperature: 0,
    max_tokens: 3072,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
})


  return NextResponse.json(response);
}