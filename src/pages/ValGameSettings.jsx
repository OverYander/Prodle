import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainLayout from '../layout/layout'
import Header from '../components/game-setting-specific/GameSettingHeader'
import RegionBanners from '../components/game-setting-specific/RegionBanner'

import AmerBanner from '../assets/img/amer-logo.png'
import EMEABanner from '../assets/img/emea-logo.png'
import PacBanner from '../assets/img/pac-logo.png'
import CNBanner from '../assets/img/cn-logo.png'

function ValGameSettings() {


  return (
    <>
        <MainLayout>
            <Header/>
            <div className="row-container w-[70vw] h-[90vh] pt-[15vh]">
                <RegionBanners image={AmerBanner} region="amer"/>
                <RegionBanners image={EMEABanner} region="emea"/>
                <RegionBanners image={PacBanner} region="pac"/>
                <RegionBanners image={CNBanner} region="cn"/>
            </div>
        </MainLayout>
    </>
  )
}

export default ValGameSettings