import React, { useState, useEffect } from 'react'
import Navigation from './Navigation';


/**
 * Responsive header inclduding main title and nav bar.
 */
const Header = () => {
    const [openUserMenu, setOpenUserMenu] = useState(false)

    const [navClass, setNavClass] = useState(() => {
        if (window.innerWidth > 1400) {
            return "large-nav"
        }
        if (window.innerWidth > 580) {
            return "medium-nav"
        }
        return "compact-nav"
    })

    const [titleClass, setTitleClass] = useState(() => {
        if (window.innerWidth > 940) {
            return "large-title"
        }
        return "compact-title"
    })

    useEffect(() => {
        const checkWindowWidth = () => {
            if (window.innerWidth > 1400) {
                setNavClass("large-nav")
                setTitleClass("large-title")
                setOpenUserMenu(false)
            } else if (window.innerWidth > 940) {
                setNavClass("medium-nav")
                setTitleClass("large-title")
                setOpenUserMenu(false)
            }
            else if (window.innerWidth > 580) {
                setNavClass("medium-nav")
                setTitleClass("compact-title")
                setOpenUserMenu(false)
            } else {
                setNavClass("compact-nav")
                setTitleClass("compact-title")
            }
        }

        window.addEventListener("resize", checkWindowWidth)

        return () => {
            window.removeEventListener("resize", checkWindowWidth)
        }

    }, [])

    return (
        <header>
            <div className={titleClass}>
                <img src="/img/header-chess.jpg" alt="header-chess" />
                <h1>Chess Mania</h1>
            </div>
            <Navigation
                navClass={navClass}
                openUserMenu={openUserMenu}
                setOpenUserMenu={setOpenUserMenu}
            />
        </header>
    )
}

export default Header

