import React, { useContext, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";


/**
 * Navigation tab to be displayed inside header.
 */
const Navigation = ({ navClass, openUserMenu, setOpenUserMenu }) => {
    const { removeAuthTokens } = useContext(AuthContext)
    const navRef = useRef()

    const displayUserMenu = () => {
        setOpenUserMenu(!openUserMenu)
    }

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (openUserMenu && navRef.current && !navRef.current.contains(e.target)) {
                console.log('hey')
                setOpenUserMenu(false)
            }
        }
        document.addEventListener("mousedown", checkOutsideClick)

        return () => {
            document.removeEventListener("mousedown", checkOutsideClick)
        }

    }, [openUserMenu, setOpenUserMenu])

    return (
        <>
            <nav className={navClass} ref={navRef}>
                <div className="menu-switch" onClick={() => displayUserMenu()}>
                    <span className="nav-text">
                        <b>Menu</b>
                    </span>
                    <img src="/img/arrow-icon.png" alt="arrow-icon" style={openUserMenu ? { transform: 'rotate(-90deg)' } : null} />
                </div>
                <div className="nav-menu" style={openUserMenu ? { display: 'flex' } : null}>
                    <Link to="/tournaments">
                        <div className="menu-item" >
                            <img src="/img/cup-icon.png" alt="cup-icon" />
                            <span className="nav-text">
                                <b>My tournaments</b>
                            </span>
                        </div>
                    </Link>
                    <Link to="/players">
                        <div className="menu-item">
                            <img src="/img/people-icon.png" alt="people-icon" />
                            <span className="nav-text">
                                <b>My players</b>
                            </span>
                        </div>
                    </Link>
                    <Link to="/profile">
                        <div className="menu-item">
                            <img src="/img/profile-icon.png" alt="profile-icon" />
                            <span className="nav-text">
                                <b>My profile</b>
                            </span>
                        </div>
                    </Link>
                    <div className="menu-item" onClick={removeAuthTokens}>
                        <img src="/img/unplug-icon.png" alt="unplug-icon" />
                        <span className="nav-text">
                            <b>Logout</b>
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;