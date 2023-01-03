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