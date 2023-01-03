import React from 'react'
import { Link, useParams } from "react-router-dom";

/**
 * List and link item component displaying some match information.
 */
const MatchesListItem = ({ match }) => {
    const { tourID, roundID } = useParams()

    return (
        <li className='two-elements-item'>
            <Link to={`/tournaments/${tourID}/rounds/${roundID}/matches/${match.number}/`} style={match.played ? { backgroundColor: "rgb(121, 165, 121)" } : { backgroundColor: "lightblue" }}>
                <span className='id-item'>#{match.number}</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{match.participant_1.username}</span>
                    <span>versus</span>
                    <span>{match.participant_2.username}</span>
                </div>
            </Link>
        </li>
    )
}

export default MatchesListItem
