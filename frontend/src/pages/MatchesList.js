import { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

/**
 * Redirects to round detail page.
 */
const MatchesList = () => {
    const { tourID, roundID } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/tournaments/${tourID}/rounds/${roundID}/`)
    }, [tourID, roundID, navigate])

    return null
}

export default MatchesList
