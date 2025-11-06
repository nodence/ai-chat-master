# 💬 AIキャラクターチャット（Next.js + Gemini API）

ユーザーが自分好みのキャラクターを設定して会話できるチャットアプリです。  
Gemini APIを使って、まるでLINEのような自然な会話体験を実現しました。

---

## 🧠 特徴

- 🎨 LINE風UIでリアルな会話体験
- 🧍 キャラクター設定（名前・性格・口調・関係性・背景）
- 🧑‍💻 あなたの名前を保存して呼びかけ対応
- 💾 localStorageで永続保存
- ⚙️ Gemini APIによる自然な応答
- 🔧 Zustandで状態管理

---

## 🧰 技術構成

| 技術 | 用途 |
|------|------|
| **Next.js 14 (App Router)** | ベースフレームワーク |
| **TypeScript** | 型安全な開発 |
| **Tailwind CSS** | デザイン構築 |
| **Zustand** | 状態管理 |
| **Gemini API** | AI応答生成 |
| **localStorage** | 設定データ永続化 |

---

## ⚙️ 環境構築

```bash
git clone https://github.com/nodence/ai-character-chat.git
cd ai-character-chat
npm install

環境設定
.env.local を作成して、Gemini APIキーを設定します。