import { useState } from 'react'

const MAX_RESULTS = 8

function PlayerSearch({ players = [], guessedNames = [], onGuess, disabled = false }) {
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)

  const q = query.trim().toLowerCase()
  const matches = q
    ? players
        .filter(p => !guessedNames.includes(p.name))
        .filter(p => p.name.toLowerCase().startsWith(q))
        .slice(0, MAX_RESULTS)
    : []

  function choose(player) {
    onGuess(player)
    setQuery('')
    setHighlight(0)
  }

  function onKeyDown(e) {
    if (!matches.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight(h => (h + 1) % matches.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight(h => (h - 1 + matches.length) % matches.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(matches[Math.min(highlight, matches.length - 1)])
    }
  }

  return (
    <div className="relative w-[40vw]">
      <input
        type="text"
        value={query}
        disabled={disabled}
        onChange={(e) => { setQuery(e.target.value); setHighlight(0) }}
        onKeyDown={onKeyDown}
        placeholder={disabled ? 'Game over' : 'Search for a player...'}
        aria-label="Search for a player"
        autoComplete="off"
        className="guess w-full h-[3em] rounded-[10px] outline-none disabled:opacity-50"
      />
      {matches.length > 0 && (
        <ul role="listbox" className="absolute z-10 top-full left-0 w-full mt-1 bg-dullblue-medium border-2 border-dullblue-light rounded-[10px] overflow-hidden">
          {matches.map((p, i) => (
            <li
              key={p.name}
              role="option"
              aria-selected={i === highlight}
              onMouseDown={(e) => { e.preventDefault(); choose(p) }}
              onMouseEnter={() => setHighlight(i)}
              className={`flex justify-between px-4 py-2 cursor-pointer ${i === highlight ? 'bg-dullblue-base' : ''}`}
            >
              <span>{p.name}</span>
              <span className="opacity-70">{p.team ?? 'Free agent'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PlayerSearch
