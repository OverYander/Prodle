import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainLayout from '../layout/layout'
import UserLogin from '../components/headers/LoginHeader'
import GameSelectMenu from '../components/GameSelectMenu'

function GameSelectPage() {
  return (
    <>
        <MainLayout>
          <UserLogin/>
          <GameSelectMenu/>
        </MainLayout>
    </>
  )
}

export default GameSelectPage