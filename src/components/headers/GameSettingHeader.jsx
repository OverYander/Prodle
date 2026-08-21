import { Link } from 'react-router-dom';
import LoginHeader from './LoginHeader'

function GameSettingHeader() {
  return (
    <>
        <nav className="nav text-3xl">
            <div className="absolute right-[10px]">
                {/* <!-- currently unimplemented --> */}
                <button id="help" className="icon"><i className="fa-regular fa-circle-question"></i></button>

                <button id="auth" className="icon"><i className="fa-solid fa-user"></i></button>
            </div>
        </nav>
    </> 
  )
}

export default GameSettingHeader