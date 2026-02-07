import { getFirebaseApp, getDb } from './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function getAuthInstance() {
  const app = getFirebaseApp();
  if (!app) return null;
  return getAuth(app);
}

/**
 * メールとパスワードでログインする。
 * 認証済み・未認証に関わらず user を返す。呼び出し元で user.emailVerified を確認して分岐すること。
 */
export async function login(email: string, password: string): Promise<User> {
  const auth = getAuthInstance();
  if (!auth) return Promise.reject(new Error('Firebase が設定されていません'));
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

/**
 * 確認メールを再送信する。
 */
export async function resendVerificationEmail(user: User): Promise<void> {
  const auth = getAuthInstance();
  if (!auth) return Promise.reject(new Error('Firebase が設定されていません'));
  auth.languageCode = 'ja';
  auth.useDeviceLanguage();
  await sendEmailVerification(user);
}

/**
 * ログアウトする。
 */
export function logout(): Promise<void> {
  const auth = getAuthInstance();
  if (!auth) return Promise.resolve();
  return firebaseSignOut(auth);
}

/**
 * 現在のユーザーを取得する。未ログインの場合は null。
 */
export function getCurrentUser(): User | null {
  const auth = getAuthInstance();
  if (!auth) return null;
  return auth.currentUser;
}

/**
 * ユーザーのログイン状態変更を監視する。コールバックには現在の User または null が渡される。
 */
export function initAuth(callback: (user: User | null) => void): () => void {
  const auth = getAuthInstance();
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * メール・パスワード・ニックネームで新規登録する。
 * ユーザー作成後、Firestore の users コレクションにプロフィールを保存する。
 */
export function registerWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  const auth = getAuthInstance();
  if (!auth) return Promise.reject(new Error('Firebase が設定されていません'));
  const db = getDb();
  if (!db) return Promise.reject(new Error('Firestore が設定されていません'));

  auth.languageCode = 'ja';
  auth.useDeviceLanguage();

  return createUserWithEmailAndPassword(auth, email, password).then(async (cred) => {
    const user = cred.user;
    await setDoc(doc(db, 'users', user.uid), {
      email,
      display_name: displayName.trim() || '',
      role: 'guest',
      plan: '通常',
      uid: user.uid,
      created_time: new Date(),
      phone_number: '',
      photo_url: '',
    });
    await sendEmailVerification(user);
    return user;
  });
}
