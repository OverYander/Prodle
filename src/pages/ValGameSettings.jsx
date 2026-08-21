import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainLayout from '../layout/layout'
import Header from '../components/headers/GameSettingHeader'
import RegionBanners from '../components/RegionBanner'

import AmerBanner from '../assets/img/amer-logo.png'
import EMEABanner from '../assets/img/emea-logo.png'
import PacBanner from '../assets/img/pac-logo.png'
import CNBanner from '../assets/img/cn-logo.png'

function ValGameSettings() {


  return (
    <>
        <MainLayout>
            <Header/>
            <div>
                <RegionBanners region="Amer" banner={AmerBanner} />
                <RegionBanners region="EMEA" banner={EMEABanner} />
                <RegionBanners region="Pac" banner={PacBanner} />
                <RegionBanners region="CN" banner={CNBanner} />
            </div>
        </MainLayout>
    </>
  )
}

export default ValGameSettings