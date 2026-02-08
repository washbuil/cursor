import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

/**
 * Firebase アプリを初期化し、設定済みの場合にのみインスタンスを返す。
 * Cloudflare Workers 等で initializeApp が失敗しても例外を投げず null を返す。
 */
function getFirebaseApp(): FirebaseApp | null {
  if (app) return app;
  const hasConfig = firebaseConfig.apiKey && firebaseConfig.projectId;
  if (!hasConfig) return null;
  try {
    app = initializeApp(firebaseConfig);
    return app;
  } catch (_err) {
    return null;
  }
}

/**
 * Firestore インスタンスを取得する。
 * .env が未設定または Cloudflare Workers 上で失敗した場合は null を返す（例外は投げない）。
 */
export function getDb(): Firestore | null {
  if (db) return db;
  try {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return null;
    db = getFirestore(firebaseApp);
    return db;
  } catch (_err) {
    return null;
  }
}

/**
 * Firebase Storage インスタンスを取得する。
 * アプリ未初期化時は null を返す。
 */
export function getFirebaseStorage(): FirebaseStorage | null {
  if (storage) return storage;
  try {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return null;
    storage = getStorage(firebaseApp);
    return storage;
  } catch (_err) {
    return null;
  }
}

export { getFirebaseApp };
