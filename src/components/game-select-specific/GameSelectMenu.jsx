import { Link } from 'react-router-dom';
import imgVal from "../../assets/img/valorant/val-logo.jpg"
import imgLol from "../../assets/img/lol-logo.png"
import imgApex from "../../assets/img/apex-logo.jpg"

const games = [
  { name: 'Valorant', image: imgVal, to: '/valorant/setup' },
  { name: 'League of Legends', image: imgLol },
  { name: 'Apex Legends', image: imgApex },
]

// Each game gets an equal 1:1:1 slice of the screen; hovering one brings it to full brightness.
function GameSection({ name, image, to }) {
  const available = Boolean(to)
  const base = 'group relative flex-1 h-full overflow-hidden border-x border-dullblue-dark'

  const content = (
    <>
      <img
        src={image}
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover transition duration-300
          ${available
            ? 'opacity-50 group-hover:opacity-100 group-hover:scale-105 group-focus-visible:opacity-100'
            : 'opacity-25 grayscale group-hover:opacity-40'}`}
      />
      <div className={`absolute inset-0 transition-shadow duration-300
        ${available ? 'group-hover:shadow-[inset_0_0_0_4px_var(--color-dullblue-light)]' : ''}`}/>
      {!available && (
        <p className="absolute inset-0 center font-ultra text-2xl text-dullblue-light">Unavailable</p>
      )}
    </>
  )

  if (!available) {
    return (
      <div className={`${base} cursor-not-allowed`} aria-disabled="true" title={`${name} is unavailable`}>
        {content}
      </div>
    )
  }

  return (
    <Link to={to} className={`${base} cursor-pointer outline-none`} aria-label={`Play ${name}`}>
      {content}
    </Link>
  )
}

function GameSelectMenu() {
  return (
    <div className="flex flex-row w-full h-full">
      {games.map(game => <GameSection key={game.name} {...game}/>)}
    </div>
  )
}

export default GameSelectMenu
