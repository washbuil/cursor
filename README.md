# キャンピングカーレンタル Webサイト

Astro + Firebase で構築したキャンピングカーレンタルサービスのWebサイトです。

## セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **Firebase 接続情報の設定**
   プロジェクトルートの `.env` に、FlutterFlow で使用している Firebase の設定値を記入してください。

   ```
   PUBLIC_FIREBASE_API_KEY=あなたのAPIキー
   PUBLIC_FIREBASE_AUTH_DOMAIN=あなたのプロジェクト.firebaseapp.com
   PUBLIC_FIREBASE_PROJECT_ID=あなたのプロジェクトID
   PUBLIC_FIREBASE_STORAGE_BUCKET=あなたのプロジェクト.appspot.com
   PUBLIC_FIREBASE_MESSAGING_SENDER_ID=数字
   PUBLIC_FIREBASE_APP_ID=あなたのアプリID
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```
   ブラウザで http://localhost:4321 を開いてください。

## コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run preview` | ビルド結果のプレビュー |

## 構成

- **Astro** - ベースフレームワーク（minimal テンプレート・TypeScript）
- **Tailwind CSS** - スタイル（@astrojs/tailwind）
- **React** - UIコンポーネント用（@astrojs/react）
- **Firebase** - バックエンド（Firestore 接続用）

Firestore からデータを取得する場合は `src/lib/firebase.ts` の `getDb()` を使用してください。`.env` が未設定の場合は `null` が返ります。
