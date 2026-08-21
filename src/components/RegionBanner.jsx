function RegionBanner({image='', region=''}) {
  return (
    <>
        {/* add color to class */}
        <div className="center banner"> 
            {/* add label and image to checkbox */}
            <input type="checkbox" id={region} name={region} className="remove-checkbox"></input>
            <label htmlFor={region} className="absolute center">
                <img src={image} className="region-logo"></img>
            </label>
        </div>
    </>
  )
}

export default RegionBanner