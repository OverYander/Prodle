import { useEffect, useRef } from 'react'

// Calls onDismiss on a click outside the returned ref's element, or on Escape, while `active`.
export function useDismiss(active, onDismiss) {
  const ref = useRef(null)

  useEffect(() => {
    if (!active) return
    const onClick = e => { if (!ref.current?.contains(e.target)) onDismiss() }
    const onKey = e => { if (e.key === 'Escape') onDismiss() }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [active, onDismiss])

  return ref
}
