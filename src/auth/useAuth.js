import { useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

// The signed-in Firebase user (null when signed out), plus sign in / out helpers.
// `loading` is true until Firebase reports whether a session was restored.
export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(auth))

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, u => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  return {
    user,
    loading,
    signInWithGoogle: () => signInWithPopup(auth, googleProvider),
    signInWithEmail: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signUpWithEmail: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    resetPassword: email => sendPasswordResetEmail(auth, email),
    signOut: () => signOut(auth),
  }
}

// Turns Firebase auth error codes into something a player can act on.
export function authErrorMessage(err) {
  switch (err?.code) {
    case 'auth/invalid-email': return 'That email address isn\'t valid.'
    case 'auth/missing-password': return 'Enter your password.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found': return 'Wrong email or password.'
    case 'auth/email-already-in-use': return 'There\'s already an account with that email. Sign in instead.'
    case 'auth/weak-password': return 'Password must be at least 6 characters.'
    case 'auth/too-many-requests': return 'Too many attempts. Wait a bit and try again.'
    case 'auth/operation-not-allowed': return 'This sign-in method isn\'t turned on in Firebase yet.'
    case 'auth/network-request-failed': return 'Network error. Check your connection.'
    default: return 'Something went wrong. Try again.'
  }
}
