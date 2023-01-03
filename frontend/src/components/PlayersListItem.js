import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { getFormattedDate } from '../utils/genericFunctions';


/**
 * List and link item component displaying some player information.
 */
const PlayersListItem = ({ tournament, player }) => {
    const [link, setLink] = useState('')

    useEffect(() => {
        if (tournament) {
            if (tournament.open) {
                setLink(`/players/${player.number}/`)
            } else {
                setLink(`/tournaments/${tournament.number}/participants/${player.number}/`)
            }
        } else {
            setLink(`/players/${player.number}/`)
        }
    }, [tournament, player])


    return (
        <li className='two-elements-item'>
            <Link to={link}>
                <span className='id-item'>
                    {tournament && "#"}{player.number}
                </span>
                <span>
                    {player.username}
                </span>
                {!tournament && <span>
                    {
                        player.date_created ?
                            getFormattedDate(player.date_created)
                            :
                            "Not defined"
                    }
                </span>}
            </Link>
        </li>
    )
}

export default PlayersListItem