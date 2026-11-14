function LoginHeader() {
  return (
    <>
      {/* Floats over the game sections so they can take the full screen */}
      <div className="absolute top-[10px] right-[10px] z-10">
        <button id="auth" className="icon"><i className="fa-solid fa-user"></i></button>
      </div>
    </>
  )
}

export default LoginHeader
