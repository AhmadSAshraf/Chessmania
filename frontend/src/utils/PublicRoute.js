import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
*Component checking if a request user can access or not the page.
 */
const PublicRoute = ({ children }) => {
    let { username } = useContext(AuthContext)
    return !username ? children : <Navigate to='/profile' />;
}

export default PublicRoute