import React from 'react';

/**
 * 404 error component.
 */
const NotFound = () => {
    return (
        <div className='main-container'>
            <div className='not-found'>
                <h4>Checkmate!! This page does not exist!</h4>
                <img src='/img/not-found.png' alt='not-found' />
            </div>
        </div>
    )
};

export default NotFound;