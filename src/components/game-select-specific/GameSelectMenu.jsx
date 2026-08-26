import { Link } from 'react-router-dom';
import imgVal from "../../assets/img/val-logo.jpg"
import imgLol from "../../assets/img/lol-logo.png"
import imgApex from "../../assets/img/apex-logo.jpg"

function GameSelectMenu() {

  return (
    <>
        <div className="center row-container flex-1 p-[2em]"> 
            <Link to="/valorant/settings" className="center flex flex-col smooth-border ">
                <img src={imgVal} className="logo"></img>
            </Link>
            <Link to="" className="center flex flex-col unavailable smooth-border text-dullblue-dark text-2xl font-ultra">
                <img src={imgLol} className="logo"></img>
                <p className="absolute center   ">Unavailable</p>
            </Link>
            <Link to="" className="center flex flex-col unavailable smooth-border text-dullblue-dark text-2xl font-ultra">
                <img src={imgApex} className="logo"></img>
                <p className="absolute center">Unavailable</p>
            </Link>
        </div>
    </>
  )
}

export default GameSelectMenu
