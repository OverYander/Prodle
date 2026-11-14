// Picks the daily player in the browser, so the hosted site needs no server or daily redeploys.
// Every visitor gets the same player for a given region slug and Eastern date.
//
// Each slug's pool is put in a seeded random order per "cycle" (one cycle = pool-size days), and
// day N of the cycle is the Nth player. So every player comes up once before anyone repeats, and
// the last player of one cycle is never the first of the next (no back-to-back repeats).
// Re-exporting players.json with a different pool (e.g. a new split) starts a new order.
import { easternDate } from './regions.js'

// FNV-1a: turns a string into a 32-bit seed.
function hash(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

// mulberry32: small seeded PRNG returning numbers in [0, 1).
function random(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffled(list, seed) {
  const next = random(seed)
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Whole days since 1970-01-01 for a "YYYY-MM-DD" date.
function dayNumber(date) {
  return Math.round(Date.parse(`${date}T00:00:00Z`) / 86_400_000)
}

function cycleOrder(players, slug, cycle) {
  const order = shuffled(players, hash(`${slug}|${cycle}`))
  // Avoid repeating yesterday's player across a cycle boundary.
  if (order.length > 2) {
    const previousLast = shuffled(players, hash(`${slug}|${cycle - 1}`)).at(-1)
    if (order[0] === previousLast) [order[0], order[1]] = [order[1], order[0]]
  }
  return order
}

// The daily player for this region slug (e.g. "amer-pac") on `date` (Eastern, "YYYY-MM-DD").
export function dailyPlayer(pool, slug, date = easternDate()) {
  if (!pool.length) return undefined
  // Sort by name so the pick doesn't depend on the order of players.json.
  const players = [...pool].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
  const day = dayNumber(date)
  const cycle = Math.floor(day / players.length)
  return cycleOrder(players, slug, cycle)[day % players.length]
}
