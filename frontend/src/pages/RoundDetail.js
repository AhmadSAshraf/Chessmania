import React, { useEffect, useState } from 'react'
import BasePage from "./BasePage";
import { useParams, Link } from "react-router-dom";
import useAxios from '../utils/useAxios';
import MatchesListItem from "../components/MatchesListItem";
import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';

/**
 * Page displaying detailed information regarding a tournament round.
 * Includes links to matches pages.
 */
const RoundDetail = () => {
    const { tourID, roundID } = useParams()
    const [round, setRound] = useState('')
    const [roundDiv, setRoundDiv] = useState('')
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const axios = useAxios()

    const getRound = async () => {
        try {
            const response = await axios.get(`/api/tournaments/${tourID}/rounds/${roundID}/`)
            setRound(response.data)
        } catch (error) {
            if (error.response.status === 404) {
                setLoading(false)
                setNotFound(true)
            }
        }
    }

    const getRoundDiv = () => {
        const renderedRoundDiv =
            <>
                <div className='detail-first-level'>
                    <h3>General informations</h3>
                    <div className='detail-second-level'>
                        <h4>Tournament link</h4>
                        <span><Link to={`/tournaments/${tourID}/`}>Tournament #{tourID}</Link></span>
                    </div>
                    <div className='detail-second-level'>
                        <h4>Status</h4>
                        <span>{round.finished_matches === round.matches.length ? "Completed" : "In progress"}</span>
                    </div>
                </div>
                <div className='detail-first-level'>
                    <h3>List of matches</h3>
                    <ul className={'horizontal-wrap-list'}>
                        {round.matches.map((match) => {
                            return (
                                <MatchesListItem
                                    key={match.number}
                                    match={match}
                                />
                            )
                        })}
                    </ul>
                </div>
            </>
        setRoundDiv(renderedRoundDiv)
        setLoading(false)
    }

    useEffect(() => {
        getRound()
    }, [])

    useEffect(() => {
        if (round) getRoundDiv()
    }, [round])


    const getMainElement = () => {
        if (loading) {
            return <Spinner />
        } else {
            if (!notFound) {
                return (
                    <div className='main-container'>
                        <h2>Tournament #{tourID} / Round #{round.number}</h2>
                        {roundDiv}
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
}

export default RoundDetail
