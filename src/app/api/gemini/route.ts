import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { history, character, userName } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ text: "Gemini APIキーが設定されていません。" });
  }

  const prompt = `
【キャラクター設定】
あなたは「${character.name}」というキャラクターです。
性格: ${character.personality}
話し方: ${character.tone}
関係性: ${character.relationship}
背景: ${character.background}

ユーザーの名前は「${userName}」です。会話ではこの名前で呼んでください。

【ルール】
- 設定に沿って一人称で自然に会話してください。
- システム的・説明的な発言はしないでください。

【これまでの会話】
${history
  .map((m: any) =>
    m.role === "user"
      ? `${userName}: ${m.content}`
      : `${character.name}: ${m.content}`
  )
  .join("\n")}
`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 800 },
      }),
    }
  );

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "……（AIが沈黙している）";
  return NextResponse.json({ text });
}
