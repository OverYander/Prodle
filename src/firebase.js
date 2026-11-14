// Firebase setup. Values come from .env (VITE_FIREBASE_*), copied from
// Firebase console -> Project settings -> Your apps -> Web app -> SDK setup and configuration.
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Without a config the rest of the app still works; login just shows as unavailable.
export const firebaseConfigured = Boolean(config.apiKey && config.authDomain && config.projectId)

export const auth = firebaseConfigured ? getAuth(initializeApp(config)) : null
export const googleProvider = new GoogleAuthProvider()
