"use client";

import { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import CharacterSetup from "./CharacterSetup";

export default function ChatPage() {
  const { messages, addMessage, character, memory, loadCharacter, userName } = useChatStore();
  const [input, setInput] = useState("");
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadCharacter();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    addMessage(userMessage);
    setInput("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          userName,
          history: [...messages, userMessage],
          memory,
        }),
      });

      const data = await res.json();
      addMessage({ role: "assistant", content: data.text || "……（AIが沈黙している）" });
    } catch (err) {
      addMessage({
        role: "assistant",
        content: "⚠️ エラーが発生しました。ネットワークまたはAPIキーを確認してください。",
      });
    }
  };

  if (isSettingOpen) {
    return <CharacterSetup onComplete={() => setIsSettingOpen(false)} />;
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-900">
      <header className="w-full max-w-md bg-green-500 text-white text-center py-3 font-semibold text-lg flex justify-between px-4">
        <span>{character.name}とのチャット</span>
        <button onClick={() => setIsSettingOpen(true)} className="text-sm">
          ⚙️ 設定
        </button>
      </header>

      <div className="flex-1 w-full max-w-md overflow-y-auto p-4 space-y-3 bg-white shadow-inner">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role !== "user" && (
              <div className="flex-shrink-0 mr-2 mt-auto">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                  {character.name.charAt(0)}
                </div>
              </div>
            )}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow ${
                m.role === "user"
                  ? "bg-green-400 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="w-full max-w-md bg-white border-t flex items-center p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="メッセージを入力..."
          className="flex-1 bg-gray-100 p-3 rounded-full text-sm focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition"
        >
          送信
        </button>
      </div>
    </main>
  );
}
