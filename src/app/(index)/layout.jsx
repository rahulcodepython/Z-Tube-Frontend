"use client"
import { Context } from '@/context/Context'
import { Decrypt } from '@/functions/Decrypt'
import FetchNewAccessToken from '@/functions/FetchNewAccessToken'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React from 'react'

const IndexLayout = ({ children }) => {
    const [loading, setLoading] = React.useState(true)

    const { isAuthenticated, setIsAuthenticated, isAccessToken, setIsAccessToken, accessToken, setAccessToken, isRefreshToken, setIsRefreshToken, refreshToken, setRefreshToken } = React.useContext(Context)

    const pathname = usePathname()

    React.useEffect(() => {

        const SetAllValuesToFalse = () => {
            setIsAuthenticated(pre => false)
            setIsAccessToken(pre => false)
            setAccessToken(pre => null)
            setIsRefreshToken(pre => false)
            setRefreshToken(pre => null)
        }

        const CheckRefreshToken = async () => {
            const refresh_token = localStorage.getItem("refresh") ?? null

            if (refresh_token === null) {
                SetAllValuesToFalse();
                sessionStorage.removeItem('access')
                return false;
            }
            else {
                const values = {
                    "token": refreshToken
                }
                await axios.post(`${process.env.BACKEND_DOMAIN_NAME}auth/token/jwt/verify/`, values)
                    .then(response => {
                        setIsAuthenticated(pre => true)
                        setIsRefreshToken(pre => true)
                        setRefreshToken(pre => Decrypt(refresh_token, process.env.ENCRYPTION_KEY))
                        return true;
                    })
                    .catch(error => {
                        SetAllValuesToFalse();
                        sessionStorage.removeItem('access')
                        return false;
                    })

            }
        }

        const CheckAccessToken = async () => {
            const access_token = sessionStorage.getItem("access") ?? null

            if (access_token === null) {
                const result = await FetchNewAccessToken(Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY));

                setIsAccessToken(pre => true)
                setAccessToken(pre => result.access)
                setRefreshToken(pre => result.refresh)
            }
            else {
                const values = {
                    "token": accessToken
                }
                await axios.post(`${process.env.BACKEND_DOMAIN_NAME}auth/token/jwt/verify/`, values)
                    .then(response => {
                        setIsAccessToken(pre => true)
                        setAccessToken(pre => Decrypt(access_token, process.env.ENCRYPTION_KEY))
                    })
                    .catch(error => {
                        SetAllValuesToFalse()
                    })
            }
        }

        const Handler = async () => {
            const refreshTokenValidation = await CheckRefreshToken();
            refreshTokenValidation ? await CheckAccessToken() : null;
            setLoading(pre => false)
        }

        Handler();
    }, [pathname])

    return loading ? "Loading..." : children
}

export default IndexLayout