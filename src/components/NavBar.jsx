import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
        <nav className="nav border-b-2 border-dullblue-base text-3xl">
            <details className="center icon">
                <summary className="list-none duration-300">
                <i className="fa-solid fa-bars"></i>
                </summary>

                <div className="dropdown bg-dullblue-base text-3xl">
                    <Link to="">temp</Link>
                    <Link to="">temp</Link>
                    <Link to="/">Home</Link>
                </div>
            </details>

            <div className="right-nav">
                {/* <!-- modal --> */}
                <button id="auth" className="icon"><i className="fa-solid fa-user"></i></button>

                {/* <!-- currently unimplemented --> */}
                <button id="help" className="icon"><i className="fa-regular fa-circle-question"></i></button>
            </div>
        </nav>
    </> 
  )
}

export default NavBar