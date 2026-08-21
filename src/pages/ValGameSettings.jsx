import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainLayout from '../layout/layout'
import Header from '../components/headers/GameSettingHeader'
import RegionBanners from '../components/RegionBanner'

function ValGameSettings() {
  return (
    <>
        <MainLayout>
          <Header/>
          <RegionBanners/>
        </MainLayout>
    </>
  )
}

export default ValGameSettings