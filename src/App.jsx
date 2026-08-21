import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import GameSelectPage from './pages/GameSelect'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameSelectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
