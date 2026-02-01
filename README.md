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
- **Cloudflare** - デプロイ先（Pages / Workers、`@astrojs/cloudflare` アダプター）

Firestore からデータを取得する場合は `src/lib/firebase.ts` の `getDb()` を使用してください。`.env` が未設定の場合は `null` が返ります。

---

## Cloudflare へのデプロイ

このプロジェクトは **Cloudflare Pages** 向けに `output: 'server'` と `@astrojs/cloudflare` アダプターで設定されています。

### 方法1: Git 連携（推奨）

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Connect to Git**
2. リポジトリを選択し、以下を設定:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: （空のまま）
3. **Environment variables** で本番用の環境変数を追加:
   - `PUBLIC_FIREBASE_API_KEY`
   - `PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `PUBLIC_FIREBASE_PROJECT_ID`
   - `PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `PUBLIC_FIREBASE_APP_ID`
4. **Save and Deploy** でデプロイ。

### 方法2: Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name=camping-car-rental
```

初回は `npx wrangler login` で Cloudflare にログインしてください。環境変数は `wrangler pages secret` または ダッシュボードの **Settings → Environment variables** で設定します。

### ローカルで Cloudflare 環境を再現する

```bash
npm run preview:cloudflare
```

（ビルド後に Wrangler で `dist` をローカルプレビューします。Wrangler が未インストールの場合は `npm install -g wrangler` または `npx wrangler` を使用）
