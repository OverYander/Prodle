function GuessRow({name='', team='', winnings='', most_played_agents=[], avg_kda='', region=''}) {
  return (
    <>
        <div className="guess-body row-container gap-[0.5em] p-1">
            <div className="stat center border-2 border-dullblue-base">{name}</div>
            <div className="stat center border-2 border-dullblue-base">{team}</div>
            <div className="stat center border-2 border-dullblue-base">{winnings}</div>
            <div className="stat center border-2 border-dullblue-base w-[12vw] h-[5vw] gap-[0.5em] p-[0.5em]">
                {most_played_agents.map((agent) => (
                    <div className="agent-logo center border-2 border-dullblue-base" key={agent}>
                        {agent}
                    </div>
                ))}
            </div>
            <div className="stat center border-2 border-dullblue-base">{avg_kda}</div>
            <div className="stat center border-2 border-dullblue-base">{region}</div>
        </div>
    </>
  )
}

export default GuessRow