import React, { useEffect, useState } from "react";
import TournamentsListItem from "../components/TournamentsListItem";
import TournamentsListHead from "../components/TournamentsListHead";
import TournamentCreation from "../components/modals/TournamentCreation";
import Pagination from '../components/Pagination';
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';
import Spinner from "../components/Spinner";
import { getFormattedUrlApi } from "../utils/genericFunctions";

/**
 * Page displaying tournaments list with links to tournaments pages.
 * Allows to filter tournaments by status (incoming, on-going, completed).
 * Allows to create new tournaments.
 * Includes pagination.
 */
const TournamentsList = () => {
    let noListDisplayed = (
        <span className="tour-list-instruction">
            Select a list of tournaments to display or create a new tournament.
        </span>
    )

    const [loading, setLoading] = useState(false);
    const [bottomDiv, setBottomDiv] = useState(noListDisplayed);
    const [tabs, setTabs] = useState({
        activeTab: null,
        tabNames: ['Upcoming tournaments', 'Current tournaments', 'Tournaments completed']
    });
    const [apiURL, setApiURL] = useState('')

    useEffect(() => {
        if (loading) getTournamentsList(apiURL)
    }, [loading]);

    let toggleList = (e, index) => {
        if (e.target.className === 'tour-type') {
            let filter = getFilter(index);
            setApiURL(`/api/tournaments/?${filter}=1`)
            setLoading(true);
        } else {
            setTabs({ ...tabs, activeTab: null });
            setBottomDiv(noListDisplayed);
        }
    }

    let setTabClassNames = (index) => {
        if (tabs.activeTab === tabs.tabNames[index]) {
            return 'tour-type-active';
        } else {
            return 'tour-type';
        }
    };

    let getFilter = (index) => {
        setTabs({ ...tabs, activeTab: tabs.tabNames[index] })
        if (tabs.tabNames[index] === 'Upcoming tournaments') {
            return 'open';
        } else if (tabs.tabNames[index] === 'Current tournaments') {
            return 'on_going';
        } else if (tabs.tabNames[index] === 'Tournaments completed') {
            return 'completed';
        }
    };

    let axios = useAxios();

    let getTournamentsList = async (apiURL) => {
        let response = await axios.get(apiURL);
        let tourList = response.data.results.map(tournament => (
            <TournamentsListItem key={tournament.number} tournament={tournament} />
        ))
        setBottomDiv(
            <div className='objects-list'>
                {response.data.results.length ?
                    <ul className="generic-list">
                        <li>
                            <span>#</span>
                            <span>Last name</span>
                            <span>Predicted date</span>
                        </li>
                        {tourList}
                    </ul>
                    :
                    <span className="tour-list-instruction">
                        There are no tournaments to display.
                    </span>}
                <Pagination
                    apiURL={apiURL}
                    setApiURL={setApiURL}
                    apiPrevious={getFormattedUrlApi(response.data.previous)}
                    apiNext={getFormattedUrlApi(response.data.next)}
                    objectsCount={response.data.count}
                    setLoading={setLoading}
                />
            </div>
        );
        setLoading(false)
    };

    let tournamentsListHead = <TournamentsListHead tabs={tabs} setTabClassNames={setTabClassNames} toggleList={toggleList} />;

    let getMainElement = () => {
        if (loading) {
            return (
                <Spinner />
            );
        } else {
            return (
                <div className="main-container">
                    {tournamentsListHead}
                    {bottomDiv}
                    <TournamentCreation />
                </div>
            );
        }
    };

    let mainElement = getMainElement();

    return (
        <BasePage main={mainElement} />
    );
};

export default TournamentsList;