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

// Green: same team. Yellow: the answer used to play for the guessed player's team.
function compareTeam(guess, answer) {
  if (guess.team && guess.team === answer.team) return { status: 'correct' }
  if (guess.team && answer.past_teams?.includes(guess.team)) return { status: 'partial' }
  return { status: 'wrong' }
}

// One result per agent slot (most played first). Green: the answer has that agent in the same
// slot. Yellow: the answer plays that agent, but in a different slot. Red: not in the answer's list.
function compareAgents(guessAgents = [], answerAgents = []) {
  return guessAgents.map((agent, i) => {
    if (answerAgents[i] === agent) return { status: 'correct' }
    if (answerAgents.includes(agent)) return { status: 'partial' }
    return { status: 'wrong' }
  })
}

export function compareGuess(guess, answer) {
  return {
    name: { status: guess.name === answer.name ? 'correct' : 'wrong' },
    team: compareTeam(guess, answer),
    winnings: compareNumber(parseWinnings(guess.winnings), parseWinnings(answer.winnings)),
    most_played_agents: compareAgents(guess.most_played_agents, answer.most_played_agents),
    avg_kda: compareNumber(guess.avg_kda, answer.avg_kda),
    assists_per_round: compareNumber(guess.assists_per_round, answer.assists_per_round),
    acs: compareNumber(guess.acs, answer.acs),
  }
}
