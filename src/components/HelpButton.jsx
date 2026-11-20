import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDismiss } from './useDismiss'

function Swatch({ className, children }) {
  return <span className={`inline-block w-4 h-4 rounded-sm align-middle mr-2 ${className}`}>{children}</span>
}

// "?" button for the top-right bar. Opens a panel explaining how to play.
function HelpButton() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const ref = useDismiss(open, close)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="How to play"
        className="w-9 h-9 rounded-full flex items-center justify-center bg-dullblue-medium text-dullblue-light hover:bg-dullblue-base cursor-pointer transition-colors"
      >
        <FontAwesomeIcon icon={faQuestion} className="text-sm"/>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-lg bg-dullblue-medium text-dullblue-light shadow-xl p-6 text-sm flex flex-col gap-4"
          >
            <button type="button" onClick={close} aria-label="Close" className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-dullblue-base cursor-pointer">
              <FontAwesomeIcon icon={faXmark}/>
            </button>

            <h2 id="help-title" className="font-val text-2xl">How to play</h2>

            <section className="flex flex-col gap-2">
              <h3 className="font-bold">1. Pick your regions</h3>
              <p>
                Choose which VCT leagues the mystery player can come from: Americas, EMEA, Pacific, or any mix.
                The "every region" button plays with all of them. Players come from this split's VCT rosters.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="font-bold">2. Guess the pro</h3>
              <p>Start typing a player's name and pick them from the list. You have unlimited guesses.</p>
              <p>Each guess shows that player's stats, and each box is colored by how close it is to the mystery player:</p>
              <ul className="flex flex-col gap-1.5">
                <li><Swatch className="bg-green-600"/>Exact match</li>
                <li><Swatch className="bg-yellow-500"/>Close: the mystery player plays that agent but in a different slot, or used to play for that team</li>
                <li><Swatch className="bg-red-700"/>No match</li>
                <li><span className="inline-block w-4 mr-2 text-center">▲▼</span>Earnings, K/D, Assists and ACS: the mystery player's number is higher or lower</li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="font-bold">The columns</h3>
              <ul className="flex flex-col gap-1 list-disc pl-5">
                <li><strong>Team</strong>: the team they played for this split</li>
                <li><strong>Earnings</strong>: career prize money</li>
                <li><strong>Agent 1–3</strong>: their 3 most-played agents, most played first. Order matters</li>
                <li><strong>K/D</strong>: career average kills per death</li>
                <li><strong>Assists/Rd</strong>: career assists per round on their top 3 agents</li>
                <li><strong>ACS</strong>: career average combat score on their top 3 agents</li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="font-bold">Daily and practice</h3>
              <p>
                Everyone gets the same daily player for each region choice, and it changes at 12am Eastern.
                Once you've solved it, keep going in practice mode with random players.
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default HelpButton
