import React, { useEffect, useState } from 'react';
import BasePage from "./BasePage";
import { useParams } from "react-router-dom";
import useAxios from "../utils/useAxios";
import PlayerUpdate from "../components/modals/PlayerUpdate";
import PlayerDelete from "../components/modals/PlayerDelete";
import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';

/**
 * Page displaying detailed information regarding a player and allowing to update or delete it.
 */
const PlayerDetail = () => {
    const { playerID } = useParams()
    const axios = useAxios()
    const [player, setPlayer] = useState('')
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [updated, setUpdated] = useState(false)

    const handleUpdate = () => {
        setLoading(true)
        setPlayer('')
        setUpdated(false)
    }

    useEffect(() => {
        if (!player) {
            axios.get(`/api/players/${playerID}/`)
                .then((response) => setPlayer(response.data))
                .catch((error) => {
                    if (error.response.status === 404) {
                        setLoading(false)
                        setNotFound(true)
                    }
                })
        } else {
            setLoading(false)
        }
    }, [player])

    useEffect(() => {
        if (updated) handleUpdate()
    }, [updated])

    const playerDiv =
        <>
            <h2>Player #{player.number}</h2>
            <div className='detail-first-level'>
                <img src="/img/portrait-placeholder.png" alt="portrait-placeholder" />
                <h3>General information</h3>
                <div className='detail-second-level'>
                    <h4>username</h4>
                    <span>{player.username}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Last name</h4>
                    <span>{player.last_name}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>First name</h4>
                    <span>{player.first_name}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Rank</h4>
                    <span>{player.rank}</span>
                </div>
            </div>
            <div className='detail-first-level'>
                <h3>Statistics</h3>
                <div className='detail-second-level'>
                    <h4>Average Place</h4>
                    <span>{player.avg_place}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Number of tournaments played</h4>
                    <span>{player.tournaments_played}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Number of tournaments won</h4>
                    <span>{player.tournaments_won}</span>
                </div>
            </div>
        </>

    const getMainElement = () => {
        if (loading) {
            return (
                <Spinner />
            )
        } else {
            if (!notFound) {
                return (
                    <div className='main-container'>
                        {playerDiv}
                        <div className='multi-btn-box'>
                            <PlayerUpdate
                                player={player}
                                setUpdated={setUpdated}
                            />
                            {!player.tournaments_list?.length && <PlayerDelete
                                player={player}
                            />}
                        </div>
                    </div>
                )
            } else {
                return (
                    <NotFound />
                )
            }
        }
    }

    let mainElement = getMainElement()

    return (
        <BasePage main={mainElement} />
    )
};

export default PlayerDetail;