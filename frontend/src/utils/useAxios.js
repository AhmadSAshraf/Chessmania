import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

/**
* Custom axios hook including axios interceptors. 
* To be used for every API call on every private pages.
 */
const useAxios = () => {
    const { authTokens, setAuthTokens, removeAuthTokens } = useContext(AuthContext)

    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${authTokens?.access}`
        }
    });


    axiosInstance.interceptors.request.use(async req => {
        let decodedAccess = jwt_decode(authTokens.access)
        let accessExpired = dayjs.unix(decodedAccess.exp).diff(dayjs()) < 1;

        if (accessExpired) {
            try {
                let response = await axios.post(`/api/token/refresh/`, { refresh: authTokens.refresh });
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                setAuthTokens(response.data)
                req.headers.Authorization = `Bearer ${response.data.access}`
            } catch (error) {
                removeAuthTokens()
            }
        }

        return req
    })

    return axiosInstance
}

export default useAxios;