/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_FIREBASE_API_KEY: string;
  readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly PUBLIC_FIREBASE_APP_ID: string;
  /** サーバー専用（推奨）。`src/pages/api/proxy.ts` などで使用 */
  readonly SECRET_API_TOKEN?: string;
  readonly PUBLIC_API_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
