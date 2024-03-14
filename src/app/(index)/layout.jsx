"use client"
import Loading from '@/components/loading'
import { AuthContext } from '@/context/AuthContext'
import { Decrypt, Encrypt } from '@/utils'
import React from 'react'
import axios from 'axios'

const IndexLayout = ({ children }) => {
    const [loading, setLoading] = React.useState(true)

    const { setUserData, LoggedInUser, LogoutUser } = React.useContext(AuthContext)

    React.useEffect(() => {
        const handler = async () => {
            await CheckUser(setUserData, LoggedInUser, LogoutUser);
        }
        handler().finally(() => {
            setLoading(() => false);
        });
    }, [])

    return loading ? <Loading /> : children
}

const VerifyToken = async (token) => {
    try {
        const options = {
            url: `${process.env.BASE_API_URL}/auth/token/jwt/verify/`,
            method: 'POST',
            data: {
                "token": token
            }
        }

        await axios.request(options)
        return true
    } catch (error) {
        return false
    }
}

const RefreshTheAccessToken = async (token, LoggedInUser) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/token/jwt/refresh/`,
        method: 'POST',
        data: {
            "refresh": token
        }
    }
    await axios.request(options)
        .then(async response => {
            await LoggedInUser(response.data.access, response.data.refresh);
        })
}

export const FetchUserData = async (token, setUserData) => {
    const options = {
        headers: {
            Authorization: `JWT ${token}`
        },
        url: `${process.env.BASE_API_URL}/auth/me/`,
        method: 'GET',
    };

    await axios.request(options)
        .then(response => {
            setUserData(() => response.data);
            sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data), process.env.ENCRYPTION_KEY));
        })
}

const CheckUser = async (setUserData, LoggedInUser, LogoutUser) => {

    const refresh_token = Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY) || null;

    const isValidateRefreshToken = refresh_token ? await VerifyToken(refresh_token) : null;

    if (!isValidateRefreshToken) {
        await LogoutUser();
    }
    else {
        const access_token = Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY) || null;

        const isValidateAccessToken = access_token ? await VerifyToken(access_token) : null;

        if (!isValidateAccessToken) {
            await RefreshTheAccessToken(refresh_token, LoggedInUser);
        }
        else {
            await LoggedInUser(access_token, refresh_token)
        }

        const user_data = Decrypt(sessionStorage.getItem("user"), process.env.ENCRYPTION_KEY) || null;

        if (!user_data) {
            await FetchUserData(Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY), setUserData);
        }
        else {
            await setUserData(JSON.parse(user_data));
        }
    }
}

export default IndexLayout