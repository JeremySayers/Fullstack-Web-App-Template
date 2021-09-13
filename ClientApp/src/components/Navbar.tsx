import React, { FC, useContext } from 'react'
import { AuthenticationContext } from '../App';

const Navbar: FC<any> = () => {
    const authentication = useContext(AuthenticationContext);

    const handleLogoutOnclick = () => {
        authentication.dispatch({ type: "LOGOUT" });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebar"
                aria-controls="offcanvasExample"
                >
                <span className="navbar-toggler-icon" data-bs-target="#sidebar"></span>
            </button>
                <a className="navbar-brand">$safeprojectname$</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ms-2">
                            <button onClick={() => handleLogoutOnclick()} className="btn btn-outline-secondary">
                                Logout
                            </button>
                        </li>
                        
                    </ul>
                </div>                
            </div>
        </nav>
    )
}

export default Navbar;