import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const body = await req.json();
  const { mode, scenarioText, history, stateNotes } = body;

  // ---------- ① シナリオ解析（構造化） ----------
  if (mode === "analyze") {
    const analyzePrompt = `
あなたはTRPGのゲームマスターAIです。
次のシナリオ本文を理解し、以下のJSON構造で要約してください。
不明な項目は空配列または空文字にしてください。

{
  "title": "",
  "summary": "",
  "setting": "",
  "objectives": [],
  "npcs": [],
  "key_items": [],
  "numbers": [],
  "rules": [],
  "endings": []
}

シナリオ本文:
${scenarioText}
`;

    const analyzed = await callGemini(apiKey, analyzePrompt);
    let structured = analyzed?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    try {
      const json = JSON.parse(structured);
      return NextResponse.json({ scenarioData: json });
    } catch {
      return NextResponse.json({
        scenarioData: {
          title: "",
          summary: scenarioText.slice(0, 300),
          setting: "",
          objectives: [],
          npcs: [],
          key_items: [],
          numbers: [],
          rules: [],
          endings: [],
        },
      });
    }
  }

  // ---------- ② シナリオ進行（AI応答） ----------
  if (mode === "chat") {
    const { scenarioData } = body;
    const prompt = `
あなたはTRPGのゲームマスター（GM）です。
以下の情報を元に、物語を進行してください。

【シナリオ概要】
${JSON.stringify(scenarioData, null, 2)}

【進行メモ】
${JSON.stringify(stateNotes || {}, null, 2)}

【これまでの会話】
${history.map((m: any) => `${m.role === "user" ? "プレイヤー" : "GM"}: ${m.content}`).join("\n")}

【出力ルール】
- シナリオに登場する人物・アイテム・番号・ルールを正確に使う。
- 不明な場合は「～のようだ」「推測する」など推論で進行。
- 矛盾しない自然な描写で、次の行動を促す。
`;

    const reply = await callGemini(apiKey, prompt);
    const text = reply?.candidates?.[0]?.content?.parts?.[0]?.text ?? "……（AIが沈黙している）";
    return NextResponse.json({ text });
  }

  return NextResponse.json({ error: "invalid mode" }, { status: 400 });
}

// ---------- Gemini API呼び出し共通関数 ----------
async function callGemini(apiKey: string, prompt: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Gemini API error:", res.status, err);
    throw new Error(err);
  }

  return res.json();
}
