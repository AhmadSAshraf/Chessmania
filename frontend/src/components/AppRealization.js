import React, { useState } from 'react';
import Modal from './modals/Modal';

/**
 * User guide to be displayed inside a modal.
 */
const AppExplained = () => {
    const [modalStatus, setModalStatus] = useState(false)
    const body =
        <div className='modal-description'>
            <p>This web application aims to follow and manage chess tournaments</p>
            <h4>First use: steps to follow</h4>
            <ul>
                <li>Create at least 20 players.</li>
                <li>Create a tournament and add a minimum of 20 players to it.</li>
                <li>Lock the tournament to create the first round and associated matches. Tournament attributes are no longer editable after lockout.</li>
                <li>The first round page is accessible on the tournament page, on which are accessible the pages of the associated matches.</li>
                <li>On the page of a match, click on the insert of one of the 2 players to designate a winner or click on the "Tie" insert in the event of a draw.</li>
                <li>Click on the "validate" button to lock the match. The outcome of a match is no longer modifiable after being locked.</li>
                <li>Once the 10 matches are locked, the next round is automatically created.</li>
                <li>Complete the matches of the following rounds, until the completion of the tournament.</li>
                <li>The player ranking is available at any time on the tournament page.</li>
            </ul>
            <h4>game system</h4>
            <p>Players are matched according to two algorithms, inspired by the Swiss gaming system :</p>
            <ul>
                <li>During the first round, players are sorted according to their rank. The list of players is then cut in 2 and the 1st player from the 1st list is associated with the 1st player from the 2nd list, etc..</li>
                <li>During the following rounds, the players are sorted according to their number of points, then according to their rank in the event of a tie. The 1st player on the list is then associated with the 2nd player. If the 2 players have already faced each other, the 1st player is associated with the 3rd, etc....</li>
            </ul>
            <p>At the end of a tournament, the new rank of each player is calculated according to the average place of all the tournaments or the number of tournaments won.</p>
        </div>

    return (
        <>
            <span onClick={() => { setModalStatus(true) }}>
                Manual
            </span>
            < Modal
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={"How to use the app"}
                body={body}
            />
        </>
    )
};

export default AppExplained;
