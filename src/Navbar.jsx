import {useState} from 'react'

export default function Navbar() {

     // the isNavbarShowing determines if the navbar is visible or not 
  const [isNavbarShowing, setNavbarShowing] = useState(false);

    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">E-Shop</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => {
                        if (isNavbarShowing == false) {
                            setNavbarShowing(true)
                        } else {
                            setNavbarShowing(false)
                        }

                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </>)
}