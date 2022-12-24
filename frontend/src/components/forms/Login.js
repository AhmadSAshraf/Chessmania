import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from '../../context/AuthContext';
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
    username: yup.string().required("User name required."),
    password: yup.string().required("Password required.")
});


/**
 * Login form to be displayed inside a modal.
 * Able to store jwt tokens inside authentication context
 */
const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });
    const { getAuthTokens } = useContext(AuthContext)

    const handleLogin = async (data) => {
        try {
            let res = await axios.post('/api/token/', data);
            getAuthTokens(res.data)
        } catch (error) {
            let status = error.response.status;
            if (status === 401) {
                setErrorMessage('These identifiers are incorrect.')
            } else if (status === 429) {
                setErrorMessage("Too many trials.")
            } else if (status === 500) {
                setErrorMessage("Server error.")
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className='input-set'>
                <span className='input-name'>Username:</span>
                <input
                    type='text'
                    name='username'
                    {...register('username')}
                />
                <span className='input-error'>{errors.username?.message}</span>
            </div>

            <div className='input-set'>
                <span className='input-name'>Password:</span>
                <input
                    type='password'
                    name='password'
                    {...register('password')}
                />
                <span className='input-error'>{errors.password?.message}</span>
            </div>

            <div className='submit-set'>
                <input
                    className='white-btn'
                    disabled={isSubmitting}
                    type='submit'
                    value="Sign in"
                />
                {errorMessage && <span className='input-error'>{errorMessage}</span>}
            </div>
        </form>
    );
};

export default Login;