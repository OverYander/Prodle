import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainLayout from '../layout/layout'
import UserLogin from '../components/game-select-specific/LoginHeader'
import GameSelectMenu from '../components/game-select-specific/GameSelectMenu'

function GameSelectPage() {
  return (
    <>
      <MainLayout orientation="horizontal">
        <UserLogin/>
        <GameSelectMenu/>
      </MainLayout>
    </>
  )
}

export default GameSelectPage