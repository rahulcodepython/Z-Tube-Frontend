"use client"
import { Encrypt } from "@/utils";
import React from "react";

export const AuthContext = React.createContext(undefined)

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [accessToken, setAccessToken] = React.useState(null)
    const [refreshToken, setRefreshToken] = React.useState(null)
    const [userData, setUserData] = React.useState({})
    const [profileData, setProfileData] = React.useState(null)

    const AuthenticateUser = async (accessToken, refreshToken) => {
        setIsAuthenticated(() => true)
        setAccessToken(() => accessToken)
        setRefreshToken(() => refreshToken)
    }

    const UnAuthenticateUser = async () => {
        setIsAuthenticated(() => false)
        setAccessToken(() => null)
        setRefreshToken(() => null)
    }

    const LoggedInUser = async (access, refresh) => {
        await AuthenticateUser(access, refresh)
        sessionStorage.setItem('access', Encrypt(access, process.env.ENCRYPTION_KEY));
        localStorage.setItem('refresh', Encrypt(refresh, process.env.ENCRYPTION_KEY));
    }

    const LogoutUser = async () => {
        await UnAuthenticateUser()
        sessionStorage.removeItem('access');
        localStorage.removeItem('refresh');
        sessionStorage.removeItem('user');
    }

    return <AuthContext.Provider value={{ isAuthenticated, AuthenticateUser, UnAuthenticateUser, LoggedInUser, LogoutUser, accessToken, userData, refreshToken, setUserData, profileData, setProfileData }}>
        {children}
    </AuthContext.Provider>
}