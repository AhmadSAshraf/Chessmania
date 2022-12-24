import React, { useState } from 'react'
import Modal from "../components/modals/Modal";
import Login from "../components/forms/Login";
import Registration from "../components/forms/Registration";

/**
 * Welcome page containing Login and Registration modal forms.
 */
const Home = () => {
    const [loginModalStatus, setLoginModalStatus] = useState(false)
    const [registerModalStatus, setRegisterModalStatus] = useState(false)
    const loginForm = <Login />
    const registerForm = <Registration />

    return (
        <main className='home'>
            <img src="/img/home-chess.jpg" alt="home-chess" />
            <h1>CHESSMANIA</h1>
            <div className='login-register'>
                <button
                    className={'login-btn'}
                    onClick={() => {
                        setLoginModalStatus(true)
                    }}
                >
                    Login
                </button>
                < Modal
                    modalStatus={loginModalStatus}
                    setModalStatus={setLoginModalStatus}
                    title={"Connection"}
                    body={loginForm}
                />
                <button
                    className={'register-btn'}
                    onClick={() => {
                        setRegisterModalStatus(true)
                    }}
                >
                    Registration
                </button>
                < Modal
                    modalStatus={registerModalStatus}
                    setModalStatus={setRegisterModalStatus}
                    title={"Registration"}
                    body={registerForm}
                />
            </div>
        </main>
    )
}

export default Home;