import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import GameSelectMenu from './pages/GameSelectMenu'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameSelectMenu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
