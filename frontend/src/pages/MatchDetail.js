import React, { useEffect, useRef, useState } from 'react'
import BasePage from "./BasePage";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';
import MatchPlayerCard from '../components/MatchPlayerCard';
import NotFound from '../components/NotFound';

/**
 * Match page containing information regarding a specific match and allowing the user to enter a match outcome.
 * A match outcome can be modified as long as it is not yet validated.
 * Match player cards are changing css classes depending of the outcome.
 */

const MatchDetail = () => {
    const { tourID, roundID, matchID } = useParams()
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [match, setMatch] = useState('')
    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')
    const [validDisabled, setValidDisabled] = useState(false)
    const playerOneCard = useRef(null)
    const playerTwoCard = useRef(null)
    const drawCard = useRef(null)
    const axios = useAxios()
    const navigate = useNavigate()
    const url = `/api/tournaments/${tourID}/rounds/${roundID}/matches/${matchID}/`

    const getMatch = async () => {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            if (error.response.status === 404) {
                setLoading(false)
                setNotFound(true)
            }
        }
    }

    const getPlayer = async (playerNumber) => {
        const url = `/api/tournaments/${tourID}/participants/${playerNumber}/`
        const response = await axios.get(url)
        return response.data
    }

    const setDraw = async (e) => {
        if (!match.played) {
            if (drawCard.current.contains(e.target) && drawCard.current.className === 'draw-btn-open') {
                const data = {
                    played: false,
                    result_participant_1: 0.5,
                    result_participant_2: 0.5
                }
                await axios.put(url, data)
                reload()
            }
        }
    }

    const setWinner = async (e) => {
        if (!match.played) {
            if (playerOneCard.current.contains(e.target) && playerOneCard.current.className !== 'winner') {
                const data = {
                    played: false,
                    result_participant_1: 1.0,
                    result_participant_2: 0.0
                }
                await axios.put(url, data)
                reload()
            } else if (playerTwoCard.current.contains(e.target) && playerTwoCard.current.className !== 'winner') {
                const data = {
                    played: false,
                    result_participant_1: 0,
                    result_participant_2: 1
                }
                await axios.put(url, data)
                reload()
            }
        }
    }

}    }
export default MatchDetail