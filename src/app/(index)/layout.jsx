"use client"
import { Context } from '@/context/Context'
import { Decrypt } from '@/functions/Decrypt'
import FetchNewAccessToken from '@/functions/FetchNewAccessToken'
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
                setIsAuthenticated(pre => true)
                setIsRefreshToken(pre => true)
                setRefreshToken(pre => Decrypt(refresh_token, process.env.ENCRYPTION_KEY))
                return true;
            }
        }

        const CheckAccessToken = async () => {
            const access_token = sessionStorage.getItem("access") ?? null

            if (access_token === null) {
                const result = await FetchNewAccessToken(Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY));

                if (result === null) {
                    SetAllValuesToFalse();
                }
                else {
                    setIsAccessToken(pre => true)
                    setAccessToken(pre => result.access)
                    setRefreshToken(pre => result.refresh)
                }
            }
            else {
                setIsAccessToken(pre => true)
                setAccessToken(pre => Decrypt(access_token, process.env.ENCRYPTION_KEY))
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