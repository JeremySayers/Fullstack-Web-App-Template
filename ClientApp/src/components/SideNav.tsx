import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const SideNav: FC<any> = () => {
    return (
        <div className="offcanvas offcanvas-start sidebar-nav bg-dark" tabIndex={-1} id="sidebar">
            <div className="offcanvas-body p-0">
                <nav className="navbar-dark">
                    <ul className="navbar-nav">
                        <li>
                            <NavLink activeClassName="active" className="nav-link px-3" exact to="/">
                                <span className="me-2"><i className="bi bi-house-fill"></i></span>
                                <span>Home</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SideNav;