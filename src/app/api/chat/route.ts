import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are Clazo AI Tutor, a smart and friendly educational assistant.

Your teaching style should:
- Explain concepts clearly and directly first
- Use simple beginner-friendly language
- Give examples whenever possible
- Ask follow-up questions ONLY when needed
- Help students understand step-by-step
- Be interactive but not overly Socratic

If the student asks to explain a topic:
1. Give a proper explanation first
2. Then provide examples
3. Then optionally ask a small follow-up question

Format responses using Markdown.

If important prerequisite knowledge is missing, include:

🔍 Identified Knowledge Gaps

at the end briefly.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check for missing or placeholder API key
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY" || apiKey.includes("YOUR_")) {
      // Mock streaming response for testing
      const mockResponse = "I am currently in **Mock Mode** because no valid Gemini API Key was found in .env.local. \n\nPlease add a real key to the `GEMINI_API_KEY` variable and restart your dev server. \n\n🔍 Identified Knowledge Gaps:\n- Fundamental Concepts\n- Logic and Reasoning";

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        start(controller) {
          const words = mockResponse.split(" ");
          let i = 0;
          const interval = setInterval(() => {
            if (i < words.length) {
              controller.enqueue(encoder.encode(words[i] + " "));
              i++;
            } else {
              clearInterval(interval);
              controller.close();
            }
          }, 50);
        },
      });

      return new Response(readableStream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    // Initialize Gemini client inside POST to ensure fresh env vars
    const genAI = new GoogleGenerativeAI(apiKey);

    // Initialize model with system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Convert messages to Gemini format and prepend system prompt to the first user message
    // or use it as a separate instruction if supported.
    // For maximum compatibility, we'll combine it with the history.
    let history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Gemini requires first message to be user

    if (history.length > 0 && history[0].role === "model") {
      history.shift();
    }

    let latestMessage = messages[messages.length - 1].content;

    // If it's the first message, inject system prompt context
    if (history.length === 0) {
      latestMessage = `${SYSTEM_PROMPT}\n\nUser Question: ${latestMessage}`;
    }

    // Start chat with history
    const chat = model.startChat({
      history: history,
    });

    // Use streaming
    const result = await chat.sendMessageStream(latestMessage);

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          const encoder = new TextEncoder();
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (error: any) {
          console.error("Stream error:", error);
          const errorMsg = `\n\n[AI Error: ${error.message}]`;
          controller.enqueue(new TextEncoder().encode(errorMsg));
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error: any) {
    console.error("Error in Gemini API Route:", error);
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error.message,
        suggestion: "Check if your API key is valid and has Gemini API enabled in Google AI Studio."
      },
      { status: 500 }
    );
  }
}
