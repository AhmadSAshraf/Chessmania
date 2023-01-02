import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import useAxios from '../utils/useAxios';
import RoundsListItem from "../components/RoundsListItem";
import PlayersListItem from "../components/PlayersListItem";
import TournamentUpdate from "../components/modals/TournamentUpdate";
import BasePage from "./BasePage";
import TournamentDelete from "../components/modals/TournamentDelete";
import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';
import { getFormattedDate } from '../utils/genericFunctions';

/**
 * Page displaying detailed information regarding a tournament.
 * Includes links to rounds and participants pages.
 * Allows to update or delete the tournament.
 */
const TournamentDetail = () => {
    const [tournament, setTournament] = useState('')
    const [playersList, setPlayersList] = useState([])
    const [numbersList, setNumbersList] = useState([])
    const [roundsList, setRoundsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [updated, setUpdated] = useState(true)
    const { tourID } = useParams()
    const axios = useAxios()

    const getTournament = async () => {
        try {
            const response = await axios.get(`/api/tournaments/${tourID}/`)
            setTournament(response.data)
            response.data.open ?
                setNumbersList(response.data.players_list) :
                setNumbersList([1, 2, 3, 4, 5, 6, 7, 8])
        } catch (error) {
            if (error.response.status === 404) {
                setLoading(false)
                setNotFound(true)
            }
        }
    }

    const getPlayersList = async (url) => {
        const response = await axios.get(url)
        let tempPlayersList = playersList
        tempPlayersList.push(response.data)
        setPlayersList(tempPlayersList)
        setNumbersList(numbersList.slice(1))
    }

    const getRoundsList = async () => {
        const response = await axios.get(`/api/tournaments/${tourID}/rounds/`)
        setRoundsList(response.data)
    }

    const handleUpdate = () => {
        setLoading(true)
        setPlayersList([])
        setRoundsList([])
        setNumbersList([])
        setTournament('')
        setUpdated(false)
    }

    useEffect(() => {
        if (updated) handleUpdate()
    }, [updated])

    useEffect(() => {
        if (!tournament) getTournament()
    }, [tournament])

    useEffect(() => {
        if (tournament && !tournament.open) getRoundsList()
    }, [tournament])

    useEffect(() => {
        if (numbersList.length) {
            if (tournament.open) {
                getPlayersList(`/api/players/${numbersList[0]}/`)
            } else {
                getPlayersList(`/api/tournaments/${tourID}/participants/${numbersList[0]}/`)
            }
        }
        if (tournament) {
            if (playersList.length === tournament.players_list.length)
                setLoading(false)
            setUpdated(false)
        }
    }, [numbersList])

    let roundsListDiv =
        <>
            <div className={'rounds-list'}>
                <h3>List of Rounds</h3>
                <ul className={'horizontal-wrap-list'}>
                    {roundsList.map((round) => (
                        <RoundsListItem
                            key={round.number}
                            round={round}
                        />
                    ))}
                </ul>
            </div>
        </>

    let playersListDiv =
        <div className={'objects-list'}>
            {tournament.open ? <h3>List of Players</h3> : <h3>List of participants</h3>}
            {playersList.length ?
                <ul className={'horizontal-wrap-list'}>
                    {playersList.map((player) => (
                        <PlayersListItem
                            key={player.number}
                            tournament={tournament}
                            player={player}
                        />
                    ))}
                </ul>
                :
                <span className='detail-second-level' style={{ borderBottom: "none", display: "flex" }}>You haven't registered any players yet.</span>}
        </div>

    const getMainElement = () => {
        if (loading) {
            return (
                <>
                    <Spinner />
                </>
            );
        } else {
            if (!notFound) {
                return (
                    <div className="main-container">
                        <h2>Tournament #{tournament.number}</h2>
                        <div className='detail-first-level'>
                            <h3>General informations</h3>
                            <div className='detail-second-level'>
                                <h4>Last name</h4>
                                <span>{tournament.name}</span>
                            </div>
                            <div className='detail-second-level'>
                                <h4>Status</h4>
                                <span>
                                    {tournament.open && "Planned"}
                                    {tournament.on_going && "In progress"}
                                    {tournament.completed && "Completed"}
                                </span>
                            </div>
                            {!tournament.open && <div className='detail-second-level'>
                                <h4>Completed Rounds</h4>
                                <span>{tournament.finished_rounds}/{tournament.total_rounds}</span>
                            </div>}
                            <div className='detail-second-level'>
                                <h4>Event date</h4>
                                <span>
                                    {tournament.tournament_date ?
                                        getFormattedDate(tournament.tournament_date)
                                        :
                                        "Not defined"
                                    }
                                </span>
                            </div>
                            <div className='detail-second-level'>
                                <h4>Creation date</h4>
                                <span>
                                    {tournament.date_created ?
                                        getFormattedDate(tournament.date_created)
                                        :
                                        "Not defined"
                                    }
                                </span>
                            </div>
                        </div>
                        {!tournament.open && <div className='detail-first-level'>
                            {roundsListDiv}
                        </div>}
                        <div className='detail-first-level'>
                            {playersListDiv}
                        </div>
                        {!tournament.open && <div className='detail-first-level'>
                            <h3>
                                Ranking {tournament.total_rounds === tournament.finished_rounds ?
                                    "final"
                                    :
                                    "temporary"}
                            </h3>
                            <ul className={'ranking-list'}>
                                <li className='ranking-item'>
                                    <span>Place</span>
                                    <span>Participant</span>
                                    <span>Total points</span>
                                    <span>Rank</span>
                                </li>
                                {tournament.ranking?.map((dict) => (
                                    <li key={dict["place"]} className='ranking-item'>
                                        <span>{dict["place"]}</span>
                                        <span>{dict["participant"]}</span>
                                        <span>{dict["total points"]}</span>
                                        <span>{dict["rank"]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>}
                        <div className='multi-btn-box'>
                            {tournament.open &&
                                <TournamentUpdate
                                    tournament={tournament}
                                    setUpdated={setUpdated}
                                />}
                            <TournamentDelete
                                tournament={tournament}
                            />
                        </div>
                    </div>
                );
            } else {
                return (
                    <NotFound />
                );
            }
        }
    };
    let mainElement = getMainElement()

    return (
        <BasePage main={mainElement} />
    );
}

export default TournamentDetail
