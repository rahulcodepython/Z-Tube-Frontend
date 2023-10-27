"use client"
import { Context } from '@/context/Context'
import { Decrypt } from '@/functions/Decrypt'
import FetchNewAccessToken from '@/functions/FetchNewAccessToken'
import { usePathname } from 'next/navigation'
import React from 'react'

const IndexLayout = ({ children }) => {
    const { isAuthenticated, setIsAuthenticated, isAccessToken, setIsAccessToken, accessToken, setAccessToken, isRefreshToken, setIsRefreshToken, refreshToken, setRefreshToken } = React.useContext(Context)

    const [loading, setLoading] = React.useState(true)
    const [proccedFurthur, setProccedFurthur] = React.useState(true)

    const pathname = usePathname()

    const SetAllValuesToFalse = () => {
        setIsAuthenticated(pre => false)
        setIsAccessToken(pre => false)
        setAccessToken(pre => null)
        setIsRefreshToken(pre => false)
        setRefreshToken(pre => null)

        setProccedFurthur(pre => false)
    }

    const CheckRefreshToken = async () => {
        const refresh_token = localStorage.getItem("refresh") ?? null

        if (refresh_token === null) {
            SetAllValuesToFalse();
        }
        else {
            setIsAuthenticated(pre => true)
            setIsRefreshToken(pre => true)
            setRefreshToken(pre => Decrypt(refresh_token, process.env.ENCRYPTION_KEY))

            setProccedFurthur(pre => true)
        }
    }

    const CheckAccessToken = async () => {
        const access_token = sessionStorage.getItem("access") ?? null

        if (access_token === null) {
            const result = await FetchNewAccessToken(refreshToken);

            if (result === null) {
                SetAllValuesToFalse();
            }
            else {
                setIsAccessToken(pre => true)
                setAccessToken(pre => result.access)
                setRefreshToken(pre => result.refresh)

                setProccedFurthur(pre => true)
            }
        }
        else {
            setIsAccessToken(pre => true)
            setAccessToken(pre => Decrypt(access_token, process.env.ENCRYPTION_KEY))

            setProccedFurthur(pre => true)
        }
    }

    const Handler = async () => {
        proccedFurthur ? await CheckRefreshToken() : null;
        proccedFurthur ? await CheckAccessToken() : null;
        setLoading(pre => false)
    }

    React.useEffect(() => {
        setProccedFurthur(pre => true)
        Handler();
    }, [pathname])

    return loading ? "Loading..." : children
}

export default IndexLayout