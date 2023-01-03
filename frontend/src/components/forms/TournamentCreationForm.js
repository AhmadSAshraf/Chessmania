import React, { useState } from 'react';
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../../utils/useAxios';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


const schema = yup.object().shape({
    name: yup
        .string()
        .required("Tournament name required."),
    tournament_date: yup
        .date(),
    players_list: yup
        .array()
        .max(50, 'The list cannot exceed 50 players.')
        .of(yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required()
        })).required()
});

/**
 * Tournament post form component to be displayed inside a modal.
 */

const TournamentCreationForm = ({ playersOptions }) => {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            tournament_date: new Date().toISOString().split('T')[0],
            players_list: []
        },
        resolver: yupResolver(schema)
    });

    const [lockedError, setLockedError] = useState('')
    const axios = useAxios()
    const navigate = useNavigate();

    const submitWithoutLocking = async (data) => {
        let locked = false
        await postData(data, locked)
    }

    const submitWithLocking = async (data) => {
        if (data.players_list.length !== 8) {
            return setLockedError('8 players are required to lock the tournament.')
        } else {
            let locked = true
            await postData(data, locked)
        }
    }

    const getCleanedData = (data, locked) => {
        let cleanedData = {}
        data.tournament_date.setDate(data.tournament_date.getDate() + 1);
        cleanedData.tournament_date = data.tournament_date.toISOString().split('T')[0]
        cleanedData.name = data.name
        cleanedData.players_list = []
        data.players_list.map(player => {
            return cleanedData.players_list.push(player.value)
        })
        cleanedData.locked = locked
        return cleanedData
    }






};
