"use client"
import React from 'react'
import { Context } from '@/context/Context'
import { AuthenticateUser, Decrypt, FetchUserData, LogoutUser, RevalidateAccessToken, VerifyToken } from '@/utils/index'
import { usePathname } from 'next/navigation'

const IndexLayout = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { isAuthenticated, setIsAuthenticated, isAccessToken, setIsAccessToken, setAccessToken, isRefreshToken, setIsRefreshToken, setRefreshToken, isUserData, setIsUserData, setUserData } = React.useContext(Context)

    const pathname = usePathname()

    React.useEffect(() => {
        const Handler = async () => {
            if (!(isAuthenticated && isAccessToken && isRefreshToken && isUserData)) {

                const refresh_token = Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY) || null;

                const isValidateRefreshToken = refresh_token ? await VerifyToken(refresh_token) : null;

                if (!isValidateRefreshToken) {
                    await LogoutUser(setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setIsUserData, setAccessToken, setRefreshToken, setUserData);
                }
                else {
                    const access_token = Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY) || null;

                    const isValidateAccessToken = access_token ? await VerifyToken(access_token) : null;

                    if (!isValidateAccessToken) {
                        await RevalidateAccessToken(Decrypt(sessionStorage.getItem("refresh"), process.env.ENCRYPTION_KEY), setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken);
                    }

                    const user_data = Decrypt(sessionStorage.getItem("user"), process.env.ENCRYPTION_KEY) || null;

                    if (!user_data) {
                        await FetchUserData(Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY), setIsUserData, setUserData);
                    }
                    else {
                        await AuthenticateUser(access_token, refresh_token, user_data, setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setAccessToken, setRefreshToken, setIsUserData, setUserData);
                    }
                }
            }
            setLoading(pre => false);
        }

        Handler();
    }, [pathname])

    return !loading && children
}

export default IndexLayout