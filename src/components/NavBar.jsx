function NavBar() {
  return (
    <>
        <nav class="nav border-b-2 border-dullblue-base text-3xl ">
            <details class="center icon">
                <summary class="list-none duration-300">
                <i class="fa-solid fa-bars"></i>
                </summary>

                <div class="dropdown bg-dullblue-base text-3xl">
                    <a>Temp</a>
                    <a>Temp</a>
                    <a href="/prodle">Return Home</a>
                </div>
            </details>

            <div className="right-nav">
                {/* <!-- modal --> */}
                <button id="auth" class="icon"><i class="fa-solid fa-user"></i></button>

                {/* <!-- currently unimplemented --> */}
                <button id="help" class="icon"><i class="fa-regular fa-circle-question"></i></button>
            </div>
        </nav>
    </>
  )
}

export default NavBar