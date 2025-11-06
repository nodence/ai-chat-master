"use client";
import { create } from "zustand";

interface Character {
  name: string;
  personality: string;
  tone: string;
  relationship: string;
  background: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  character: Character;
  userName: string; // 🆕 追加
  memory: string;
  addMessage: (m: Message) => void;
  setCharacter: (c: Partial<Character>) => void;
  setUserName: (name: string) => void; // 🆕 追加
  resetChat: () => void;
  loadCharacter: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  character: {
    name: "紗夜",
    personality: "少しツンデレだけど本当は優しい",
    tone: "丁寧で少し照れた感じ",
    relationship: "あなたの幼なじみ",
    background: "子供の頃からずっと一緒に過ごしてきた。",
  },
  userName: "あなた", // 🆕 デフォルト
  memory: "",

  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),

  setCharacter: (c) =>
    set((s) => {
      const updated = { ...s.character, ...c };
      if (typeof window !== "undefined") {
        localStorage.setItem("character", JSON.stringify(updated));
      }
      return { character: updated };
    }),

  setUserName: (name) =>
    set(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("userName", name);
      }
      return { userName: name };
    }),

  resetChat: () => set({ messages: [] }),

  loadCharacter: () => {
    if (typeof window === "undefined") return;
    const storedChar = localStorage.getItem("character");
    const storedUser = localStorage.getItem("userName");

    const updates: any = {};
    if (storedChar) {
      try {
        updates.character = JSON.parse(storedChar);
      } catch {
        console.warn("⚠️ Failed to load character from localStorage");
      }
    }
    if (storedUser) updates.userName = storedUser;
    set(updates);
  },
}));
