import { useNavigate } from 'react-router-dom'
import allLogo from '../../assets/img/valorant/region/all-logo.svg'
import { regionsToSlug } from '../../data/regions'

function SettingSubmission({ selectedRegions = [] }) {
  const navigate = useNavigate()
  const canSubmit = selectedRegions.length > 0

  function submit() {
    if (!canSubmit) return
    navigate(`/valorant/${regionsToSlug(selectedRegions)}`)
  }

  return (
    <>
      <div className="col-container items-center h-[90vh] pt-[15vh] justify-between">
        <button
          type="button"
          onClick={() => navigate('/prodle/valorant/global')}
          title="Play with every region"
          className="global-logo m-[10px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        >
          <img src={allLogo} alt="Play with every region"/>
        </button>

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className={`w-full h-fit parrallel-container bg-valorant-red p-[5px] pt-[8px] m-[10px] ${canSubmit ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
        >
          <span className="font-val text-2xl parrallel-text">
            Play Game
          </span>
        </button>
      </div>
    </>
  )
}

export default SettingSubmission
