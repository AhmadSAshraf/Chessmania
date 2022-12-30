import React, { useEffect, useState } from 'react';
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';

/**
 * Profile page displaying basic user information.
 */

const Profile = () => {



}

useEffect(() => {
    if (loading) {
        axios.get(`/api/profile/`).then((response) => {
            setProfile(response.data[0])
            setLoading(false)
        })
    };;
