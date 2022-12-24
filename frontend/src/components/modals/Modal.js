import React, { useRef, useEffect } from 'react';


/**
 * Modal component able to display description texts and forms.
 */
const Modal = ({ modalStatus, setModalStatus, title, body }) => {
    const containerRef = useRef()

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (modalStatus && containerRef.current && !containerRef.current.contains(e.target)) {
                setModalStatus(false)
            }
        }
        document.addEventListener("mousedown", checkOutsideClick)

        return () => {
            document.removeEventListener("mousedown", checkOutsideClick)
        }

    }, [modalStatus, setModalStatus])

    return (
        <>
            {modalStatus && <div
                className={'modal-background'}
                onClick={(e) => { if (e.target.className === 'modal-background') setModalStatus(false) }}>
                <div className={'modal-container'} ref={containerRef}>
                    <img className="closing-cross" src="/img/closing-cross.png" alt="closing-cross" onClick={() => { setModalStatus(false) }} />
                    <div className={'modal-title'}>
                        <h3>{title}</h3>
                    </div>
                    <div className={'modal-body'}>
                        {body}
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Modal;