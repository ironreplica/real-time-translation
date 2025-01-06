import { Mistral } from "@mistralai/mistralai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.MISTRAL_API_KEY;
    const client = new Mistral({ apiKey: apiKey });
    const { userMessage, language } = await req.json();
    console.log("translating to: ", language);

    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "user",
          content: `Translate: "${userMessage}" to "${language}". Return only the translated message, no quotation marks surrounding the text. If the language is already "${language}", return the original message.`,
        },
      ],
    });

    await chatResponse; // Ensure the response is awaited.

    console.log(
      "Translated message: " + chatResponse.choices[0].message.content
    );
    return NextResponse.json({
      response: chatResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
