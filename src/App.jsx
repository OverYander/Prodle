import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import GameSelectPage from './pages/GameSelect'
import ValGameSettings from './pages/ValSetup'
import ValProdle from './pages/ValProdle'
import ProfileButton from './components/ProfileButton'
import HelpButton from './components/HelpButton'

// Pages that show the help and profile buttons in the top right (not the game select screen).
function WithProfileButton() {
  return (
    <>
      <div className="fixed top-3 right-3 z-40 flex items-center gap-2">
        <HelpButton/>
        <ProfileButton/>
      </div>
      <Outlet/>
    </>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameSelectPage />} />
        <Route element={<WithProfileButton />}>
          <Route path="/valorant/setup" element={<ValGameSettings />} />
          <Route path="/prodle/valorant/:regions" element={<ValProdle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
