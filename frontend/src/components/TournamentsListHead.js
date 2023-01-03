import React from 'react'

/**
 * Tournaments list header allowing to select different tournament filters.
 */
const TournamentsListHead = ({ tabs, setTabClassNames, toggleList }) => {
    return (
        <>
            <h2>My Tournaments</h2>
            <div className='tournaments-types-nav'>
                {tabs.tabNames.map((tabName, index) => (
                    <h4 key={index} className={setTabClassNames(index)} onClick={(e) => toggleList(e, index)}>
                        {tabName}
                    </h4>
                ))}
            </div>
        </>
    )
}

export default TournamentsListHead
