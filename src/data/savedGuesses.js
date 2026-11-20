// Saves the daily game's guesses in a cookie, one cookie per region slug, so a refresh or
// coming back later the same day restores the board. Practice games are never saved.
//
// Value: "<Eastern date>|name|name|..." (newest guess first), URI-encoded. Guesses saved on an
// earlier date are ignored, so a new day starts fresh. Only names are stored to stay well under
// the ~4KB cookie limit (every player in the global pool is ~1.7KB).

const MAX_AGE = 2 * 24 * 60 * 60 // 2 days; a stale cookie is ignored anyway once the date changes.

function cookieName(slug) {
  return `valprodle_${slug}`
}

function readCookie(name) {
  const prefix = `${name}=`
  const part = document.cookie.split('; ').find(c => c.startsWith(prefix))
  if (!part) return null
  try {
    return decodeURIComponent(part.slice(prefix.length))
  } catch {
    return null
  }
}

// Guess names saved for this slug today, newest first. Empty if none or saved on another day.
export function loadGuessNames(slug, date) {
  const value = readCookie(cookieName(slug))
  if (!value) return []
  const [savedDate, ...names] = value.split('|')
  return savedDate === date ? names.filter(Boolean) : []
}

export function saveGuessNames(slug, date, names) {
  const value = encodeURIComponent([date, ...names].join('|'))
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${cookieName(slug)}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`
}
