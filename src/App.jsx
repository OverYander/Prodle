import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import GameSelectPage from './pages/GameSelect'
import ValGameSettings from './pages/ValGameSettings'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameSelectPage />} />
        <Route path="/valorant/settings" element={<ValGameSettings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
