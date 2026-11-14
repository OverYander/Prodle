// Compares a guessed player to the answer, field by field.
// Each field gets 'correct' | 'partial' | 'wrong', plus a direction ('up' | 'down')
// for numeric fields telling the player which way the answer is.

export function parseWinnings(winnings) {
  if (!winnings) return 0
  return Number(String(winnings).replace(/[^0-9.]/g, '')) || 0
}

function compareNumber(guess, answer) {
  if (guess === answer) return { status: 'correct' }
  return { status: 'wrong', direction: answer > guess ? 'up' : 'down' }
}

export function compareGuess(guess, answer) {
  const guessAgents = guess.most_played_agents ?? []
  const answerAgents = answer.most_played_agents ?? []
  const shared = guessAgents.filter(a => answerAgents.includes(a)).length
  const sameAgents = shared === answerAgents.length && shared === guessAgents.length

  return {
    name: { status: guess.name === answer.name ? 'correct' : 'wrong' },
    team: { status: guess.team === answer.team ? 'correct' : 'wrong' },
    winnings: compareNumber(parseWinnings(guess.winnings), parseWinnings(answer.winnings)),
    most_played_agents: { status: sameAgents ? 'correct' : shared > 0 ? 'partial' : 'wrong' },
    avg_kda: compareNumber(guess.avg_kda, answer.avg_kda),
    region: { status: guess.region === answer.region ? 'correct' : 'wrong' },
  }
}
