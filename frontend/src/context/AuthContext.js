import { createContext, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';

const AuthContext = createContext()

export default AuthContext;

/**
 * Provides authentication information, including stored jwt tokens.
 */
export const AuthProvider = ({ children }) => {
    let checkToken = () => {
        return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    }

    const [authTokens, setAuthTokens] = useState(checkToken)
    const [username, setUsername] = useState(authTokens ? jwt_decode(authTokens.access).username : null)

    let getAuthTokens = (resData) => {
        let username = jwt_decode(resData.access).username
        setUsername(username)
        setAuthTokens(resData);
        localStorage.setItem('authTokens', JSON.stringify(resData))
    }

    let removeAuthTokens = () => {
        setAuthTokens(null);
        setUsername(null)
        localStorage.removeItem("authTokens")
    }

    let context = {
        authTokens: authTokens,
        username: username,
        setAuthTokens: setAuthTokens,
        getAuthTokens: getAuthTokens,
        removeAuthTokens: removeAuthTokens,
    }

    useEffect(() => {
        if (authTokens) {
            let decodedRefresh = jwt_decode(authTokens.refresh)
            let refreshExpired = dayjs.unix(decodedRefresh.exp).diff(dayjs()) < 1;
            if (refreshExpired) return removeAuthTokens()
        }
    }, [authTokens])

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}