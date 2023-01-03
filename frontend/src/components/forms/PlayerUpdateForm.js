import React, { useState } from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../utils/useAxios";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Username Required."),
    last_name: yup
        .string()
        .required("Last name required."),
    first_name: yup
        .string()
        .required("First name required.")
});

/**
 * Player update form component to be displayed inside a modal.
 */
const PlayerUpdateForm = ({ player, setUpdated, setModalStatus }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            username: player.username,
            last_name: player.last_name,
            first_name: player.first_name
        },
        resolver: yupResolver(schema)
    });
    const axios = useAxios()
    const [uniqueError, setUniqueError] = useState(false)

    const putData = async (data) => {
        try {
            await axios.put(`/api/players/${player.number}/`, data)
            setUniqueError(false)
            setUpdated(true)
            setModalStatus(false)
        } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                setUniqueError(true)
            }
        }
    }

    return (
        <div>
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
                <div className='input-set'></div>
                <span className='input-name'>Username :</span>
                <input
                    type='text'
                    name='last_name'
                    {...register('last_name')}
                />
                <span className='input-error'>{errors.last_name?.message}</span>

                <div className='input-set'></div>
                <span className='input-name'>First name :</span>
                <input
                    type='text'
                    name='first_name'
                    placeholder="Player's first name"
                    {...register('first_name')}
                />
                <span className='input-error'>{errors.first_name?.message}</span>

                <div className='submit-set'>
                    <input
                        className='green-btn'
                        disabled={isSubmitting}
                        onClick={handleSubmit(putData)}
                        type='submit'
                        value="Modifier"
                    />
                    {uniqueError && <span className='input-error'>This username is already used by one of your players</span>}
                </div>
            </form>
        </div>
    );
};

export default PlayerUpdateForm;