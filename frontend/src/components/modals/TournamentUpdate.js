import React, { useEffect } from 'react'
import { useState } from "react";
import Modal from "../modals/Modal";
import TournamentUpdateForm from "../forms/TournamentUpdateForm";
import useAxios from "../../utils/useAxios";
import { getFormattedUrlApi } from '../../utils/genericFunctions';

/**
 * Button component calling a tournament update modal.
 */
const TournamentUpdate = ({ tournament, setUpdated }) => {
    const [modalStatus, setModalStatus] = useState(false)
    const [playersOptions, setPlayersOptions] = useState([])
    const [nextPage, setNextPage] = useState('')
    const [defaultPlayers, setDefaultPlayers] = useState([])
    const [readyForRender, setReadyForRender] = useState(false)
    const axios = useAxios()

    async function getPlayersList(url) {
        try {
            const tempList = playersOptions
            const response = await axios.get(url)
            response.data.results.map(player => {
                return tempList.push({
                    value: player.number,
                    label: player.username
                })
            })
            setPlayersOptions(tempList)

            if (response.data.next != null) {
                setNextPage(getFormattedUrlApi(response.data.next))
            } else {
                setNextPage('')
                if (!defaultPlayers.length) getDefaultPlayers(tempList)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getDefaultPlayers = (playersTempList) => {
        let tempDefaultPlayers = []
        tournament.players_list.map((defaultPlayer) => {
            return playersTempList.map((optionPlayer) => {
                if (defaultPlayer === optionPlayer.value) {
                    return tempDefaultPlayers.push(optionPlayer)
                } else {
                    return null
                }
            })
        })
        setDefaultPlayers(tempDefaultPlayers)
        setReadyForRender(true)
    }

    useEffect(() => {
        const url = '/api/players/'
        getPlayersList(url)
    }, [])

    useEffect(() => {
        if (nextPage) getPlayersList(nextPage)
    }, [nextPage])

    const form = <
        TournamentUpdateForm
        tournament={tournament}
        setUpdated={setUpdated}
        defaultPlayers={defaultPlayers}
        playersOptions={playersOptions}
    />

    return (
        <div className='tour-creation'>
            <button
                className={'modal-opening green-btn'}
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                Edit
            </button>
            {readyForRender && < Modal
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={`Editing Tournament n°${tournament.number}`}
                body={form}
            />}
        </div>
    );
};

export default TournamentUpdate;