"use client"
import { Context } from '@/context/Context'
import { Decrypt } from '@/functions/Decrypt'
import { Encrypt } from '@/functions/Encrypt'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React from 'react'

const IndexLayout = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { isAuthenticated, setIsAuthenticated, isAccessToken, setIsAccessToken, accessToken, setAccessToken, isRefreshToken, setIsRefreshToken, refreshToken, setRefreshToken, isUserData, setIsUserData, userData, setUserData } = React.useContext(Context)
    const pathname = usePathname()

    React.useEffect(() => {
        const setAuthUserFalse = async () => {
            setIsAuthenticated(pre => false);
            setIsAccessToken(pre => false);
            setAccessToken(pre => null);
            setIsRefreshToken(pre => false);
            setRefreshToken(pre => null);
            return false;
        }

        const TokenValidationFalse = async () => {
            sessionStorage.removeItem('access');
            localStorage.removeItem('refresh');
            await setAuthUserFalse();
        }

        const setAuthUserTrue = async (access, refresh) => {
            setIsAuthenticated(pre => true);
            setIsAccessToken(pre => true);
            setAccessToken(pre => access);
            setIsRefreshToken(pre => true);
            setRefreshToken(pre => refresh);
            return true;
        }

        const CheckUserData = async () => {
            if (!isUserData) {
                if (sessionStorage.getItem("user")) {
                    setIsUserData(pre => true);
                    setUserData(pre => JSON.parse(Decrypt(sessionStorage.getItem("user"), process.env.ENCRYPTION_KEY)));
                }
                else {
                    const option = {
                        headers: {
                            Authorization: `JWT ${Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY)}`
                        }
                    };

                    try {
                        const response = await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/me/`, option);
                        setIsUserData(pre => true);
                        setUserData(pre => response.data);
                        sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data), process.env.ENCRYPTION_KEY));
                    } catch (error) { }
                }
            }
        }

        const FetchNewAccessToken = async () => {
            await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/refresh/`, { "refresh": Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY) })
                .then(async response => {
                    sessionStorage.setItem('access', Encrypt(response.data.access, process.env.ENCRYPTION_KEY));
                    localStorage.setItem('refresh', Encrypt(response.data.refresh, process.env.ENCRYPTION_KEY));
                    await CheckUserData();
                    return await setAuthUserTrue(response.data.access, response.data.refresh);
                })
                .catch(async error => {
                    return await TokenValidationFalse();
                })
        }

        const CheckAccessToken = async () => {
            const access_token = sessionStorage.getItem("access") ? Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY) : null;

            if (!access_token) {
                return await FetchNewAccessToken();
            }

            await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/verify/`, { "token": access_token })
                .then(async response => {
                    await CheckUserData();
                    return await setAuthUserTrue(access_token, Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY));
                })
                .catch(async error => {
                    return await FetchNewAccessToken();
                })
        }

        const CheckRefreshToken = async () => {
            const refresh_token = localStorage.getItem("refresh") ? Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY) : null;

            if (!refresh_token) {
                return await TokenValidationFalse();
            }

            await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/token/jwt/verify/`, { "token": refresh_token })
                .then(async response => {
                    return await CheckAccessToken();
                })
                .catch(async error => {
                    return await TokenValidationFalse();
                })
        }

        const Handler = async () => {
            await CheckRefreshToken();
            setLoading(pre => false);
        }

        Handler();
    }, [pathname])

    return loading ? "Loading..." : children
}

export default IndexLayout