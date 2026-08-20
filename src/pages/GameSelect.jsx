import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainLayout from '../layout/layout'
import NavBar from '../components/NavBar'
import GameSelectMenu from '../components/GameSelectMenu'

function GameSelectPage() {
  return (
    <>
        <MainLayout>
            <header>
                <NavBar/>
            </header>

            <GameSelectMenu/>

        </MainLayout>
    </>
  )
}

export default GameSelectPage