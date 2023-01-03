import React, { useState } from 'react';
import Modal from './modals/Modal';

/**
 * Description of the stacks used to realize the complete App. 
 * To be displayed inside a modal.
 */
const AppRealization = () => {
    const [modalStatus, setModalStatus] = useState(false)
    const body =
        <div className='modal-description' style={{ display: "flex", flexDirection: "column" }}>
            <p>
                Application created by Ahmad Ashraf (first React application), from development to deployment.
                <b>Application Developer - </b>
                .
            </p>
            <div className='used-techs'>
                <div className='tech'>
                    <h4>Backend</h4>
                    <img src='/img/django-icon.png' alt='django-icon' />
                    <span>Django Rest Framework</span>
                </div>
                <div className='tech'>
                    <h4>Database</h4>
                    <img src='/img/postgre-icon.png' alt='postgre-icon' />
                    <span>PostgreSQL</span>
                </div>
                <div className='tech'>
                    <h4>Deployment</h4>
                    <img src='/img/heroku-icon.png' alt='heroku-icon' />
                    <span>Heroku</span>
                </div>
            </div>
            <div className='used-techs'>
                <div className='tech'>
                    <h4>Frontend</h4>
                    <img src='/img/react-icon.png' alt='react-icon' />
                    <span>React JS</span>
                </div>

            </div>
        </div>

    return (
        <>
            <span onClick={() => { setModalStatus(true) }}>
                Production
            </span>
            < Modal
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={"Production of the application"}
                body={body}
            />
        </>
    )
};

export default AppRealization;
