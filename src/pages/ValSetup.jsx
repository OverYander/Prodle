import { useState } from 'react'

import MainLayout from '../layout/layout'
import Header from '../components/game-setting-specific/GameSettingHeader'
import RegionBanners from '../components/game-setting-specific/RegionBanner'
import SettingSubmission from '../components/game-setting-specific/SettingSubmission'
import { AVAILABLE_REGIONS } from '../data/regions'

import AmerBanner from '../assets/img/valorant/region/amer-logo.png'
import EMEABanner from '../assets/img/valorant/region/emea-logo.png'
import PacBanner from '../assets/img/valorant/region/pac-logo.png'
import CNBanner from '../assets/img/valorant/region/cn-logo.png'

function ValGameSettings() {
  const [checkedRegions, setCheckedRegions] = useState({
    amer: false,
    emea: false,
    pac: false,
  })

  function toggleCheck(region) {
    return (checked) => {
      setCheckedRegions(prev => ({ ...prev, [region]: checked }))
    }
  }

  const selected = AVAILABLE_REGIONS.filter(r => checkedRegions[r])

  return (
    <>
        <MainLayout orientation="horizontal">
            <Header/>
            <div className="row-container w-[80vw] h-[90vh] pt-[15vh]">
                <RegionBanners image={AmerBanner} region="amer" checked={checkedRegions.amer} onChange={toggleCheck('amer')}/>
                <RegionBanners image={EMEABanner} region="emea" checked={checkedRegions.emea} onChange={toggleCheck('emea')}/>
                <RegionBanners image={PacBanner} region="pac" checked={checkedRegions.pac} onChange={toggleCheck('pac')}/>
                <RegionBanners image={CNBanner} region="cn" disabled/>
            </div>
            <SettingSubmission selectedRegions={selected}/>
        </MainLayout>
    </>
  )
}

export default ValGameSettings
