import imgVal from "../assets/img/val-logo.jpg"
import imgLol from "../assets/img/lol-logo.png"
import imgApex from "../assets/img/apex-logo.jpg"

function homepage() {

  return (
    <>
        <div className="center flex-1 p-[2em]"> 
            <div className="row-container smooth-border center p-[8em]">
                <a href="/prodle/valorant/settings" className="center flex flex-col smooth-border ">
                    <img src={imgVal} className="logo"></img>
                </a>
                <a href="" className="center flex flex-col unavailable smooth-border text-dullblue-dark text-2xl font-ultra">
                    <img src={imgLol} className="logo"></img>
                    <p className="absolute center">Unavailable</p>
                </a>
                <a href="" className="center flex flex-col unavailable smooth-border text-dullblue-dark text-2xl font-ultra">
                    <img src={imgApex} className="logo"></img>
                    <p className="absolute center">Unavailable</p>
                </a>
            </div>
        </div>
    </>
  )
}

export default homepage
