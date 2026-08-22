import { useState } from 'react'

const regions = {
  amer: {label : 'AMERICAS', bgColor: 'bg-[#F9B79F]', font: 'font-val'},
  emea: {label : 'EMEA', bgColor: 'bg-[#d5ff00]', font: 'font-val'},
  pac: {label : 'PACIFIC', bgColor: 'bg-[#AEE6EA]', font: 'font-val'},
  cn: {label : 'UNAVAILABLE', bgColor: 'bg-[#FE9AB1]', WIP: 'unavailable text-gray-600', font: 'font-ultra'},
}

function RegionBanner({image='', region=''}) {
  const [checked, setChecked] = useState(false)

  const info = regions[region]
  if (!info) {
    console.error(`Invalid region: ${region}`)
    return null
  }

  const { label, bgColor, WIP, font } = info

  return (
    <>
        {/* add color to class */}
        <div className={`center banner ${bgColor} ${WIP} ${font}`}> 
            {/* add label and image to checkbox */}
            <input type="checkbox" id={region} name={region} className="remove-checkbox"></input>
            <label htmlFor={region} className={`absolute center col-container p-0 gap-[20px] banner-text`}>
                <img src={image} className="region-logo"></img>
                {label}
            </label>
        </div>
    </>
  )
}

export default RegionBanner