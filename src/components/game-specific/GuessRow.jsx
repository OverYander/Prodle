const agentImages = import.meta.glob('../../assets/img/valorant/agents/*.png', { eager: true, import: 'default' })

function agentImage(agent) {
  return agentImages[`../../assets/img/valorant/agents/${agent.toLowerCase()}.png`]
}

const statusColor = {
  correct: 'bg-green-600',
  partial: 'bg-yellow-500',
  wrong: 'bg-red-700',
}

const arrow = { up: '▲', down: '▼' }

function Cell({ result, className = '', children }) {
  return (
    <div className={`stat center flex-col border-2 border-dullblue-base text-center text-xs break-all p-1 ${statusColor[result?.status] ?? ''} ${className}`}>
      {children}
      {result?.direction && <span>{arrow[result.direction]}</span>}
    </div>
  )
}

function GuessRow({ name='', team='', winnings='', most_played_agents=[], avg_kda='', region='', results={} }) {
  return (
    <>
        <div className="guess-body row-container gap-[0.5em] p-1">
            <Cell result={results.name}>{name}</Cell>
            <Cell result={results.team}>{team ?? 'Free agent'}</Cell>
            <Cell result={results.winnings}>{winnings ?? '$0'}</Cell>
            <div className={`stat center flex-row border-2 border-dullblue-base w-[12vw] h-[5vw] gap-[0.5em] p-[0.5em] ${statusColor[results.most_played_agents?.status] ?? ''}`}>
                {most_played_agents.map((agent) => (
                    <div className="agent-logo center border-2 border-dullblue-base" key={agent} title={agent}>
                        {agentImage(agent) ? <img src={agentImage(agent)} alt={agent}/> : agent}
                    </div>
                ))}
            </div>
            <Cell result={results.avg_kda}>{avg_kda}</Cell>
            <Cell result={results.region}>{region}</Cell>
        </div>
    </>
  )
}

export default GuessRow
