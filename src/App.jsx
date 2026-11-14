import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GameSelectPage from './pages/GameSelect'
import ValGameSettings from './pages/ValSetup'
import ValProdle from './pages/ValProdle'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameSelectPage />} />
        <Route path="/valorant/setup" element={<ValGameSettings />} />
        <Route path="/prodle/valorant/:regions" element={<ValProdle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
