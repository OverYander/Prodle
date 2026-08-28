import { Link } from 'react-router-dom';
import LoginHeader from '../game-select-specific/LoginHeader'

function GameSettingHeader() {
  return (
    <>
      
      <div className="nav absolute top-[10px] right-[10px] h-fit">
          {/* <!-- currently unimplemented --> */}
          <button id="help" className="icon"><i className="fa-regular fa-circle-question"></i></button>

          <button id="auth" className="icon"><i className="fa-solid fa-user"></i></button>
      </div>
    </> 
  )
}

export default GameSettingHeader