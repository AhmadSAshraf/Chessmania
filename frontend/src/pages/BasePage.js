import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NotFound from '../components/NotFound';


/**
 * Base page used for all private routes and 404 errors.
 */
const BasePage = ({ main }) => {
    const [mainClass, setMainClass] = useState(() => {
        if (window.innerWidth > 1400) {
            return "large-main"
        }
        if (window.innerWidth > 940) {
            return "medium-main"
        }
        if (window.innerWidth > 580) {
            return "small-main"
        }
        return "compact-main"
    })

    const [footerClass, setFooterClass] = useState(() => {
        if (window.innerWidth > 1400) {
            return "large-footer"
        }
        if (window.innerWidth > 940) {
            return "medium-footer"
        }
        if (window.innerWidth > 580) {
            return "small-footer"
        }
        return "compact-footer"
    })

    useEffect(() => {
        const checkWindowWidth = () => {
            if (window.innerWidth > 1400) {
                setMainClass("large-main")
                setFooterClass("large-footer")
            } else if (window.innerWidth > 940) {
                setMainClass("medium-main")
                setFooterClass("medium-footer")
            }
            else if (window.innerWidth > 580) {
                setMainClass("small-main")
                setFooterClass("small-footer")
            } else {
                setMainClass("compact-main")
                setFooterClass("compact-footer")
            }
        }

        window.addEventListener("resize", checkWindowWidth)

        return () => {
            window.removeEventListener("resize", checkWindowWidth)
        }

    }, [])

    return (
        <>
            <Header />
            <main className={mainClass}>
                {main ? main : <NotFound />}
            </main>
            <Footer
                footerClass={footerClass}
            />
        </>
    )
}

export default BasePage
