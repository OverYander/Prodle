import { useState } from 'react'
import allLogo from '../../assets/img/all-logo.svg'

function SettingSubmission() {
  // created for now to track
  const [gameNumber, setGameNumber] = useState(0)

  function nextGame() {
    setGameNumber(prev => prev + 1)
  }

  return (
    <>
      <div className="col-container items-center h-[90vh] pt-[15vh] justify-between">
        <a href={`valorant/global`} className="global-logo m-[10px]">
          <img src={allLogo} alt="Global Logo"/>
        </a>
          
        <button type="submit" className="w-full h-fit parrallel-container bg-valorant-red p-[5px] pt-[8px] m-[10px]">
          <span className="font-val text-2xl parrallel-text">
            Play Game
          </span>
        </button>
      </div>
    </> 
  )
}

export default SettingSubmission