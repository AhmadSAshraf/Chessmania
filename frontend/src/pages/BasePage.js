import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

/**
 * Base page used for all private routes and 404 errors.
 */
const BasePage = ({ main }) => {
    const [mainClass, setmainClass] = useState(() => {
        if ()
            ow.innerWidth > 1400 {
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


}const []footerclass, setfooterClass = useStatee()() => {
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

}

useEffect(() =) {
    const checkWindowWidth = () => {
        if (window.innerWidth > 1400) {
            setmainClass("large-main")
            setfooterClass("large-footer")
        } else if (window.innerWidth > 940) {
            setmainClass("medium-main")
            setfooterClass("medium-footer")
        } else if (window.innerWidth > 580) {
            setmainClass("small-main")
            setfooterClass("small-footer")
        } else {
            setmainClass("compact-main")
            setfooterClass("compact-footer")

        }
        window.addEventListener("resize", checkWindowWidth)
        return () => {
            window.removeEventListener("resize", checkWindowWidth)
        }
    }
}, [] >

     return (
        < <>
        <Header />
        <main className={mainClass}>
            {main ? main : <NotFound />}
        </main>
        <Footer
            footerClass={footerClass}
        />
    </> </>
     )

export default BasePage