import React from 'react'
import { Link } from "react-router-dom";
import { getFormattedDate } from '../utils/genericFunctions';

/**
 * List and link item component displaying some tournament information.
 */
const TournamentsListItem = ({ tournament }) => {

    return (
        <li className='tournament-item'>
            <Link to={`/tournaments/${tournament.number}/`}>
                <span>
                    {tournament.number}
                </span>
                <span>
                    {tournament.name}
                </span>
                <span>
                    {
                        tournament.tournament_date ?
                            getFormattedDate(tournament.tournament_date)
                            :
                            "Not defined"
                    }
                </span>
            </Link>
        </li>
    )
}

export default TournamentsListItem
