import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../../utils/useAxios';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Username required."),
    last_name: yup
        .string()
        .required("Name required."),
    first_name: yup
        .string()
        .required("First name required.")
});


/**
 * Player post form component to be displayed inside a modal.
 */
const PlayerCreationForm = ({ setCreated }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });
    const axios = useAxios()
    const navigate = useNavigate();
    const [uniqueError, setUniqueError] = useState(false)

    const postData = async (data) => {
        console.log(data)
        try {
            let response = await axios.post('/api/players/', data)
            navigate(`/players/${response.data.number}/`)
            setUniqueError(false)
            setCreated(true)
        } catch (error) {
            if (error.response.status === 400) setUniqueError(true)
        }
    }

    return (
        <form>
            <div className='input-set'>
                <span className='input-name'>Username :</span>
                <input
                    type='text'
                    name='username'
                    {...register('username')}
                />
                <span className='input-error'>{errors.username?.message}</span>
            </div>

            <div className='input-set'>
                <span className='input-name'>Last name :</span>
                <input
                    type='text'
                    name='last_name'
                    {...register('last_name')}
                />
                <span className='input-error'>{errors.last_name?.message}</span>
            </div>

            <div className='input-set'>
                <span className='input-name'>First name :</span>
                <input
                    type='text'
                    name='first_name'
                    {...register('first_name')}
                />
                <span className='input-error'>{errors.first_name?.message}</span>
            </div>

            <div className='submit-set'>
                <input
                    className='green-btn'
                    disabled={isSubmitting}
                    onClick={handleSubmit(postData)}
                    type='submit'
                    value="To create"
                />
                {uniqueError && <span className='input-error'>This username is already used by one of your players</span>}
            </div>
        </form>
    );
};

export default PlayerCreationForm;