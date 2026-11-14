import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useAuth, authErrorMessage } from '../auth/useAuth'
import { firebaseConfigured } from '../firebase'
import { useDismiss } from './useDismiss'

const inputClass = 'rounded-md bg-dullblue-dark px-2 py-1.5 text-dullblue-light placeholder:text-dullblue-base outline-none focus:ring-2 focus:ring-dullblue-light'
const buttonClass = 'rounded-md bg-dullblue-dark px-3 py-1.5 hover:bg-dullblue-base cursor-pointer disabled:opacity-60 disabled:cursor-wait'
const linkClass = 'underline hover:text-white cursor-pointer'

// Email + password form with sign in / create account modes, plus Google and password reset.
function SignInForm({ onDone }) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)

  async function run(action) {
    setError('')
    setNotice('')
    setBusy(true)
    try {
      await action()
      return true
    } catch (err) {
      // Closing the Google popup isn't an error worth showing.
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError(authErrorMessage(err))
      }
      return false
    } finally {
      setBusy(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const ok = await run(() => (mode === 'signin' ? signInWithEmail(email, password) : signUpWithEmail(email, password)))
    if (ok) onDone()
  }

  async function handleGoogle() {
    if (await run(signInWithGoogle)) onDone()
  }

  async function handleReset() {
    if (!email) {
      setError('Enter your email above, then click "Forgot password?" again.')
      return
    }
    if (await run(() => resetPassword(email))) setNotice(`Password reset email sent to ${email}.`)
  }

  const isSignIn = mode === 'signin'

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <p className="font-bold">{isSignIn ? 'Sign in' : 'Create an account'}</p>
        <input
          type="email" required autoComplete="email" placeholder="Email" aria-label="Email"
          value={email} onChange={e => setEmail(e.target.value)} className={inputClass}
        />
        <input
          type="password" required minLength={6} placeholder="Password" aria-label="Password"
          autoComplete={isSignIn ? 'current-password' : 'new-password'}
          value={password} onChange={e => setPassword(e.target.value)} className={inputClass}
        />
        <button type="submit" disabled={busy} className={buttonClass}>
          {isSignIn ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <div className="flex justify-between text-xs">
        <button type="button" className={linkClass} onClick={() => { setMode(isSignIn ? 'signup' : 'signin'); setError(''); setNotice('') }}>
          {isSignIn ? 'Create an account' : 'I have an account'}
        </button>
        {isSignIn && <button type="button" className={linkClass} onClick={handleReset}>Forgot password?</button>}
      </div>

      {error && <p role="alert" className="text-xs text-red-300">{error}</p>}
      {notice && <p role="status" className="text-xs">{notice}</p>}

      <div className="flex items-center gap-2 text-xs text-dullblue-light/70">
        <span className="h-px flex-1 bg-dullblue-base"/> or <span className="h-px flex-1 bg-dullblue-base"/>
      </div>
      <button type="button" onClick={handleGoogle} disabled={busy} className={`${buttonClass} flex items-center justify-center gap-2`}>
        <FontAwesomeIcon icon={faGoogle}/> Continue with Google
      </button>
    </>
  )
}

// Small profile button for the top-right bar. Opens a menu to sign in or out.
function ProfileButton() {
  const { user, loading, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useDismiss(open, () => setOpen(false))

  async function handleSignOut() {
    await signOut()
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={user ? `Account: ${user.displayName ?? user.email}` : 'Sign in'}
        aria-expanded={open}
        className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-dullblue-medium text-dullblue-light hover:bg-dullblue-base cursor-pointer transition-colors"
      >
        {user?.photoURL
          ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover"/>
          : <FontAwesomeIcon icon={faUser} className="text-sm"/>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg bg-dullblue-medium text-dullblue-light shadow-lg p-3 text-sm flex flex-col gap-2">
          {!firebaseConfigured ? (
            <p>Login isn't set up yet. Add the Firebase keys to .env.</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              <p className="truncate">Signed in as <strong>{user.displayName ?? user.email}</strong></p>
              <button type="button" onClick={handleSignOut} className={buttonClass}>Sign out</button>
            </>
          ) : (
            <SignInForm onDone={() => setOpen(false)}/>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfileButton
