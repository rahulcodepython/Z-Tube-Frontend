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
            setIsAuthenticated(pre => false)
            setIsAccessToken(pre => false)
            setAccessToken(pre => null)
            setIsRefreshToken(pre => false)
            setRefreshToken(pre => null)
        }

        const TokenValidationFalse = async () => {
            sessionStorage.removeItem('access')
            localStorage.removeItem('refresh')
            await setAuthUserFalse();
        }

        const CheckRefreshToken = async () => {
            const refresh_token = localStorage.getItem("refresh") ? Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY) : null

            if (refresh_token === null) {
                await TokenValidationFalse();
                return false;
            }
            else {
                let result = false;

                const values = {
                    "token": refresh_token
                }

                await axios.post(`${process.env.BACKEND_DOMAIN_NAME}auth/token/jwt/verify/`, values)
                    .then(response => {
                        result = true;
                    })
                    .catch(async (error) => {
                        await TokenValidationFalse();
                    })

                return result;
            }
        }

        const setAuthUserTrue = async (access, refresh) => {
            setIsAuthenticated(pre => true)
            setIsAccessToken(pre => true)
            setAccessToken(pre => access)
            setIsRefreshToken(pre => true)
            setRefreshToken(pre => refresh)
        }

        const FetchNewAccessToken = async () => {
            let result = false;

            const values = {
                "refresh": Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY)
            }

            await axios.post(`${process.env.BACKEND_DOMAIN_NAME}auth/token/jwt/refresh/`, values)
                .then(async (response) => {
                    sessionStorage.setItem('access', Encrypt(response.data.access, process.env.ENCRYPTION_KEY))
                    localStorage.setItem('refresh', Encrypt(response.data.refresh, process.env.ENCRYPTION_KEY))
                    await setAuthUserTrue(response.data.access, response.data.refresh)
                    result = true;
                })
                .catch(async (error) => {
                    await TokenValidationFalse();
                })

            return result;
        }

        const CheckAccessToken = async () => {
            const access_token = sessionStorage.getItem("access") ? Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY) : null

            if (access_token === null) {
                const result = await FetchNewAccessToken();
                return result;
            }
            else {
                let result = false;

                const values = {
                    "token": access_token
                }

                await axios.post(`${process.env.BACKEND_DOMAIN_NAME}auth/token/jwt/verify/`, values)
                    .then(async (response) => {
                        await setAuthUserTrue(access_token, Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY))
                        result = true;
                    })
                    .catch(async (error) => {
                        const fetchResult = await FetchNewAccessToken();
                        result = fetchResult;
                    })

                return result;
            }
        }

        const CheckUserData = async () => {
            if (!isUserData) {
                if (sessionStorage.getItem("user")) {
                    setIsUserData(pre => true)
                    setUserData(pre => JSON.parse(Decrypt(sessionStorage.getItem("user"), process.env.ENCRYPTION_KEY)))
                }
                else {
                    const option = {
                        headers: {
                            Authorization: `JWT ${Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY)}`
                        },
                    }

                    await axios.get(`${process.env.BACKEND_DOMAIN_NAME}auth/me/`, option)
                        .then(response => {
                            setIsUserData(pre => true)
                            setUserData(pre => response.data)
                            sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data), process.env.ENCRYPTION_KEY))
                        })
                }
            }
        }

        const Handler = async () => {
            const refreshTokenValidation = await CheckRefreshToken();
            if (refreshTokenValidation) {
                const accessTokenValidation = await CheckAccessToken();
                accessTokenValidation ? await CheckUserData() : null;
            }
            setLoading(pre => false)
        }

        Handler();
    }, [pathname])

    return loading ? "Loading..." : children
}

export default IndexLayout