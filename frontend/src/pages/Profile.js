import React, { useEffect, useState } from 'react';
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';

/**
 * Profile page displaying basic user information.
 */

const Profile = () => {
    const [profile, setProfile] = useState('')
    const [loading, setLoading] = useState(true)
    const axios = useAxios()

    useEffect(() => {
        if (loading) {
            axios.get(`/api/profile/`).then((response) => {
                setProfile(response.data[0])
                setLoading(false)
            })
        }
    }, [loading])

    let profileDiv = (
        <div className='main-container'>
            <h2>My profile</h2>
            <div className='detail-first-level'>
                <h3>General information</h3>
                <div className='detail-second-level'>
                    <h4>username</h4>
                    <span>{profile?.username}</span>
                </div>
            </div>
            <div className='detail-first-level'>
                <h3>Statistics</h3>
                <div className='detail-second-level'>
                    <h4>Number of tournaments created</h4>
                    <span>{profile?.tournaments_created}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Number of players created</h4>
                    <span>{profile?.players_created}</span>
                </div>
            </div>
        </div>
    )

    let mainElement =
        <>
            {loading ? <Spinner /> : profileDiv}
        </>

    return (
        <>
            <BasePage main={mainElement} />
        </>
    )
};

export default Profile;