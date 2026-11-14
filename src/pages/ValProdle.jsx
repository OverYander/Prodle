import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import MainLayout from '../layout/layout'
import PlayerSearch from '../components/game-specific/PlayerSearch'
import GuessInformationLabels from '../components/game-specific/GuessInformationLabels'
import GuessRow from '../components/game-specific/GuessRow'
import players from '../data/players.json'
import { REGION_CODES, slugToRegions, regionsToSlug, easternDate } from '../data/regions'
import { compareGuess } from '../data/compareGuess'

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// public/daily/valorant.json is written by `npm run daily` (scripts/daily-players.mjs).
function useDailyAnswers() {
  const [daily, setDaily] = useState({ loading: true })

  useEffect(() => {
    let cancelled = false
    fetch('/daily/valorant.json', { cache: 'no-store' })
      .then(res => (res.ok ? res.json() : null))
      .catch(() => null)
      .then(data => { if (!cancelled) setDaily({ loading: false, data }) })
    return () => { cancelled = true }
  }, [])

  return daily
}

function ValProdle() {
  const { regions: rawSlug } = useParams()
  const regions = slugToRegions(rawSlug)
  const daily = useDailyAnswers()

  if (regions.length === 0) return <Navigate to="/valorant/setup" replace/>

  // Normalise e.g. "pac-amer" -> "amer-pac" so it matches the daily file's keys.
  const slug = regionsToSlug(regions)
  if (slug !== rawSlug) return <Navigate to={`/prodle/valorant/${slug}`} replace/>

  if (daily.loading) return null

  const regionCodes = regions.map(r => REGION_CODES[r])
  const pool = players.filter(p => regionCodes.includes(p.region))

  const isToday = daily.data?.date === easternDate()
  const dailyName = isToday ? daily.data.answers?.[slug] : undefined
  const dailyAnswer = pool.find(p => p.name === dailyName)

  // Keyed so switching regions or a new day starts a fresh game.
  return (
    <ValProdleGame
      key={`${slug}-${daily.data?.date}`}
      regionCodes={regionCodes}
      pool={pool}
      dailyAnswer={dailyAnswer}
    />
  )
}

function ValProdleGame({ regionCodes, pool, dailyAnswer }) {
  // No daily pick available (script hasn't run today) -> fall back to a random practice player.
  const [answer, setAnswer] = useState(() => dailyAnswer ?? pickRandom(pool))
  const [guesses, setGuesses] = useState([])
  const isDaily = Boolean(dailyAnswer) && answer === dailyAnswer

  const won = guesses.some(g => g.name === answer?.name)

  function guess(player) {
    if (won) return
    setGuesses(prev => [player, ...prev])
  }

  function practice() {
    setAnswer(pickRandom(pool))
    setGuesses([])
  }

  return (
    <>
        <MainLayout orientation="vertical">
            <div className="col-container items-center w-full h-full overflow-y-auto pt-[8vh] gap-[1.5em]">
                <h1 className="font-val text-4xl">ValProdle</h1>
                <p className="opacity-80">
                  {isDaily ? 'Daily' : 'Practice'}: guess the {regionCodes.join(' / ')} pro player
                  {' · '}
                  <Link to="/valorant/setup" className="underline">change regions</Link>
                </p>

                {!answer ? (
                  <p>No players found for these regions. Scrape them into players.db and run <code>npm run export-players</code>.</p>
                ) : (
                  <>
                    <PlayerSearch
                      players={players}
                      guessedNames={guesses.map(g => g.name)}
                      onGuess={guess}
                      disabled={won}
                    />

                    {won && (
                      <div className="center flex-col gap-2">
                        <p className="font-val text-2xl">
                          You got it in {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}: {answer.name}
                        </p>
                        {isDaily && <p className="opacity-80">A new player drops at 12am ET.</p>}
                        <button type="button" onClick={practice} className="parrallel-container bg-valorant-red px-4 py-1 cursor-pointer">
                          <span className="parrallel-text font-val">{isDaily ? 'Practice Mode' : 'Play Again'}</span>
                        </button>
                      </div>
                    )}

                    {guesses.length > 0 && (
                      <div className="flex flex-col items-center">
                        <GuessInformationLabels/>
                        {guesses.map(g => (
                          <GuessRow key={g.name} {...g} results={compareGuess(g, answer)}/>
                        ))}
                      </div>
                    )}
                  </>
                )}
            </div>
        </MainLayout>
    </>
  )
}

export default ValProdle
