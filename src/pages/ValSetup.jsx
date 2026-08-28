import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'

import MainLayout from '../layout/layout'
import Header from '../components/game-setting-specific/GameSettingHeader'
import RegionBanners from '../components/game-setting-specific/RegionBanner'
import SettingSubmission from '../components/game-setting-specific/SettingSubmission'

import AmerBanner from '../assets/img/amer-logo.png'
import EMEABanner from '../assets/img/emea-logo.png'
import PacBanner from '../assets/img/pac-logo.png'
import CNBanner from '../assets/img/cn-logo.png'

function ValGameSettings() {
  const [checkedRegions, setCheckedRegions] = useState({
    'amer': false,
    'emea': false,
    'pac': false,
    'cn': false
  });

  function toggleCheck(region) {
    return (checked) => {
      setCheckedRegions(prev => ({...prev, [region]: checked}))
    }
  }

  return (
    <>
        <MainLayout orientation="horizontal">
            <Header/>
            <div className="row-container w-[80vw] h-[90vh] pt-[15vh]">
                <RegionBanners image={AmerBanner} region="amer" checked={checkedRegions.amer} onChange={toggleCheck('amer')}/>
                <RegionBanners image={EMEABanner} region="emea" checked={checkedRegions.emea} onChange={toggleCheck('emea')}/>
                <RegionBanners image={PacBanner} region="pac" checked={checkedRegions.pac} onChange={toggleCheck('pac')}/>
                <RegionBanners image={CNBanner} region="cn"/>
            </div>
            <SettingSubmission selectedRegions={checkedRegions}/>
        </MainLayout>
    </>
  )
}

export default ValGameSettings