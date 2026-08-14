function GuessInformationLabels() {
  return (
    <>
        <div id='guesses-label' className="row-container gap-[0.5em] p-1">
            <div className="stat-label center">Name</div>
            <div className="stat-label center">Team</div>
            <div className="stat-label center">Earnings</div>
            <div className="stat-label center w-[12vw] h-[5vw]">Agents Played</div>
            <div className="stat-label center">K/D/A</div>
            <div className="stat-label center">Region</div>
        </div>
    </>
  )
}

export default GuessInformationLabels