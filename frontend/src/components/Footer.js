import React from 'react';
import AppExplained from './AppExplained';
import AppRealization from './AppRealization';

/**
 * Footer component containing app explanation / realization and external links.
 */
const Footer = ({ footerClass }) => {
    return (
        <footer className={footerClass}>
            <div className='footer-container'>
                <div className='real-howto'>
                    <AppExplained />
                    <AppRealization />
                </div>
                <div className='footer-external-links'>
                    <a href="https://github.com/AhmadSAshraf/Chessmania" target="_blank" rel='noreferrer'>
                        <img src='/img/github-icon.png' alt='github-icon' />
                        <span>GitHub</span>
                    </a>
                    <a href=" " target="_blank" rel='noreferrer'>
                        <img src='/img/linkedin-icon.png' alt='linkedin-icon-icon' />
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
default Footer;
