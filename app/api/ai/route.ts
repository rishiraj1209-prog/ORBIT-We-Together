import { NextRequest, NextResponse } from "next/server";

const fallbackReply =
  "Orbit AI recommends improving your resume, building one strong project, connecting with relevant alumni, and applying through referral-backed opportunities.";

export async function POST(req: NextRequest) {
  try {
    const { message, type } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: fallbackReply });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: fallbackReply,
      });
    }

    const prompt = `
You are Orbit AI, an expert career copilot for college students.

Task type: ${type || "career_chat"}

User input:
${message}

Give a useful, structured, practical response.
Use headings, bullet points, and specific next actions.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || fallbackReply;

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: fallbackReply });
  }
}