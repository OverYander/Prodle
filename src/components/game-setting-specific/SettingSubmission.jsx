import { useState } from 'react'
import { Link } from 'react-router-dom'
import allLogo from '../../assets/img/all-logo.svg'

function SettingSubmission( selectedRegions ) {
  // created for now to track
  const [gameNumber, setGameNumber] = useState(0)

  function nextGame() {
    setGameNumber(prev => prev + 1)
  }
  
  let route = ''
  const regions = Object.keys(selectedRegions.selectedRegions).filter(region => selectedRegions.selectedRegions[region])
  if(regions.length === 3) {
    route = 'global'
  }
  else {
    route = regions.join('-')
  }

  return (
    <>
      <div className="col-container items-center h-[90vh] pt-[15vh] justify-between">
        <Link to={`global`} className="global-logo m-[10px]">
          <img src={allLogo} alt="Global Logo"/>
        </Link>

        <Link to={route} type="submit" className="w-full h-fit parrallel-container bg-valorant-red p-[5px] pt-[8px] m-[10px]">
          <span className="font-val text-2xl parrallel-text">
            Play Game
          </span>
        </Link>
      </div>
    </> 
  )
}

export default SettingSubmission