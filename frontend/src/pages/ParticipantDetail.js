import React, { useEffect, useState } from 'react';
import BasePage from "./BasePage";
import { useParams, Link } from "react-router-dom";
import useAxios from "../utils/useAxios";
import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';

/**
 * Page displaying detailed information regarding a tournament participant.
 */
const ParticipantDetail = () => {
    const { tourID, partID } = useParams()
    const axios = useAxios()
    const [participant, setParticipant] = useState('')
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!participant) {
            axios.get(`/api/tournaments/${tourID}/participants/${partID}/`)
                .then((response) => setParticipant(response.data))
                .catch((error) => {
                    if (error.response.status === 404) {
                        setLoading(false)
                        setNotFound(true)
                    }
                })
        } else {
            setLoading(false)
        }
    }, [participant, tourID, partID, axios])

    const participantDiv =
        <>
            <div className='detail-first-level'>
                <img src="/img/portrait-placeholder.png" alt="portrait-placeholder" />
                <h3>General information</h3>
                <div className='detail-second-level'>
                    <h4>username</h4>
                    <span>{participant.username}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Last name</h4>
                    <span>{participant.last_name}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>First name</h4>
                    <span>{participant.first_name}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Player link</h4>
                    <span><Link to={`/players/${participant.player_number}/`}>Player #{participant.player_number}</Link></span>
                </div>
            </div>
            <div className='detail-first-level'>
                <h3>Tournament information</h3>
                <div className='detail-second-level'>
                    <h4>Tournament link</h4>
                    <span><Link to={`/tournaments/${tourID}/`}>Tournament #{tourID}</Link></span>
                </div>
                <div className='detail-second-level'>
                    <h4>Rank (the day of the tournament)</h4>
                    <span>{participant.rank}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Number of points</h4>
                    <span>{participant.total_points}</span>
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
                        <h2>Tournament #{tourID} / Participant #{participant.number}</h2>
                        {participantDiv}
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

export default ParticipantDetail;