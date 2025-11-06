# 💬 AIキャラクターチャット（React + Next.js + Gemini API）

ユーザーが自分好みのキャラクターを設定して会話できる  
**React製チャットアプリ**です。  
Next.jsとTypeScriptをベースに、Gemini APIを使って自然な会話体験を実現しました。

## 🧠 特徴

- 🧍 キャラクター設定（名前・性格・口調・関係性・背景）
- 💬 LINE風のReactチャットUI
- 🔄 Zustandによる状態管理（React Hooks構成）
- 💾 localStorageで設定の永続化
- ⚙️ Gemini API連携（fetchによるPOST通信）

---

## 🧰 技術構成

| 技術 | 用途 |
|------|------|
| **React 18** | コンポーネント設計とUI構築の基盤 |
| **Next.js 14 (App Router)** | ページ遷移・SSR/CSR管理 |
| **TypeScript** | 型安全なReact開発 |
| **Tailwind CSS** | デザイン構築 |
| **Zustand** | React Hooksベースの状態管理 |
| **Gemini API** | AI応答生成 |
| **localStorage** | 設定データ永続化 |

---
## セットアップ
git clone https://github.com/ユーザー名/ai-character-chat.git
cd ai-character-chat
npm install

.env.local にGemini APIキーを設定：
GEMINI_API_KEY=your_api_key