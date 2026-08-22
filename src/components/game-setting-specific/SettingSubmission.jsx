import allLogo from '../../assets/img/all-logo.svg'

function SettingSubmission() {
  return (
    <>
      <div className="col-container items-center h-[90vh] pt-[15vh]">
        <img src={allLogo} className="region-logo"></img>
        <input type="submit" value="Submit" class="w-full h-fit bg-dullblue-base border-2 rounded-md border-dullblue-light"></input>
      </div>
    </> 
  )
}

export default SettingSubmission