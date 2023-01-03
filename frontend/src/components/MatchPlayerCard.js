import React from 'react';

/**
 * Component displaying player information on match detail page.
 */
const MatchPlayerCard = ({ player }) => {
    return (
        <div className='match-player-card'>
            <img src="/img/portrait-placeholder.png" alt="portrait-placeholder" />
            <h4>{player.username} (#{player.number})</h4>
        </div>
    )
}

export default MatchPlayerCard
