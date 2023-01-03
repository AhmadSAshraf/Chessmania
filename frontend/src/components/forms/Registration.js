import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Username required."),
    password: yup
        .string()
        .required("Password required.")
        .min(8, "The password must contain at least 8 characters."),
    password2: yup
        .string()
        .oneOf([yup.ref("password"), null])
});


/**
 * Registration form to be displayed inside a modal.
 */
const Registration = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState('')
    const [newUser, setNewUser] = useState('')

    const handleRegister = async (data) => {
        try {
            let response = await axios.post('/api/register/', data);
            reset({})
            setNewUser(response.data.username)
        } catch (error) {
            let response = error.response;
            if (response.status === 400) {
                response.data.username ?
                    setErrorMessage("This username is incorrect or already in use.") :
                    response.data.password ?
                        setErrorMessage("This password is too common.") :
                        setErrorMessage("Bad request");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className='input-set'>
                <span className='input-name'>username :</span>
                <input
                    type='text'
                    name='username'
                    {...register('username')}
                />
                <span className='input-error'>{errors.username?.message}</span>
            </div>
            <div className='input-set'>
                <span className='input-name'>Password :</span>
                <input
                    type='password'
                    name='password'
                    {...register('password')}
                />
                <span className='input-error'>{errors.password?.message}</span>
            </div>

            <div className='input-set'>
                <span className='input-name'>Confirm Password :</span>
                <input
                    type='password'
                    name='password2'
                    {...register('password2')}
                />
                {errors.password2 && <span className='input-error'>Passwords do not match.</span>}
            </div>
            <div className='submit-set'>
                <input
                    className='white-btn'
                    disabled={isSubmitting}
                    type='submit'
                    value="Register"
                />
                {errorMessage && <span className='input-error'>{errorMessage}</span>}
                {newUser && <span className='submit-success'>The user<b>{newUser}</b> was created successfully !</span>}
            </div>
        </form>
    );
};

export default Registration;