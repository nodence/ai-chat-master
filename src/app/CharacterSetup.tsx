"use client";

import { useChatStore } from "@/store/chatStore";
import { useState } from "react";

export default function CharacterSetup({ onComplete }: { onComplete: () => void }) {
  const { character, setCharacter, resetChat, userName, setUserName } = useChatStore();
  const [form, setForm] = useState(character);
  const [nameInput, setNameInput] = useState(userName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setCharacter(form);
    setUserName(nameInput);
    resetChat();
    onComplete();
  };

  const setTemplate = (template: typeof form) => {
    setForm(template);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        🧩 キャラクター設定
      </h2>

      {/* テンプレートボタン */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() =>
            setTemplate({
              name: "紗夜",
              personality: "ツンデレで本当は優しい",
              tone: "丁寧で少し照れた感じ",
              relationship: "幼なじみ",
              background: "小さい頃から一緒にいて、最近少し距離ができた。",
            })
          }
          className="text-xs bg-neutral-800 px-3 py-1 rounded hover:bg-neutral-700 transition"
        >
          🎀 幼なじみツンデレ
        </button>

        <button
          onClick={() =>
            setTemplate({
              name: "ユウナ",
              personality: "落ち着いていて知的",
              tone: "優しく丁寧な口調",
              relationship: "家庭教師",
              background: "勉強を教える先生としてあなたの面倒を見ている。",
            })
          }
          className="text-xs bg-neutral-800 px-3 py-1 rounded hover:bg-neutral-700 transition"
        >
          📘 優しい先生
        </button>

        <button
          onClick={() =>
            setTemplate({
              name: "ミカ",
              personality: "明るくて元気、よく笑う",
              tone: "タメ口でフレンドリー",
              relationship: "クラスメイト",
              background: "学校で同じクラスになって仲良くなった。",
            })
          }
          className="text-xs bg-neutral-800 px-3 py-1 rounded hover:bg-neutral-700 transition"
        >
          🌟 明るい同級生
        </button>
      </div>

      {/* 🧍 あなたの名前 */}
      <div className="w-full max-w-md mb-4">
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="あなたの名前（例：翔太）"
          className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded text-white"
        />
        <p className="text-xs text-gray-400 mt-1">
          あなたの名前です。AIはこの名前であなたを呼びます。
        </p>
      </div>

      {/* 入力フォーム */}
      <div className="space-y-4 w-full max-w-md">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="キャラクターの名前（例：紗夜）"
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded text-white"
          />
        </div>

        <div>
          <input
            name="personality"
            value={form.personality}
            onChange={handleChange}
            placeholder="性格（例：ツンデレ・優しい・元気）"
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded text-white"
          />
        </div>

        <div>
          <input
            name="tone"
            value={form.tone}
            onChange={handleChange}
            placeholder="口調（例：丁寧・タメ口・方言など）"
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded text-white"
          />
        </div>

        <div>
          <input
            name="relationship"
            value={form.relationship}
            onChange={handleChange}
            placeholder="関係性（例：幼なじみ・先生・恋人）"
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded text-white"
          />
        </div>

        <div>
          <textarea
            name="background"
            value={form.background}
            onChange={handleChange}
            placeholder="背景（例：昔からの知り合いで、最近また話すようになった）"
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded text-white"
            rows={3}
          />
        </div>
      </div>

      {/* 保存ボタン */}
      <button
        onClick={handleSave}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition"
      >
        保存してチャットへ
      </button>
    </div>
  );
}
