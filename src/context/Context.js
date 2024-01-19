"use client"
import React from "react";

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)

    const [isAccessToken, setIsAccessToken] = React.useState(false)
    const [accessToken, setAccessToken] = React.useState(null)

    const [isRefreshToken, setIsRefreshToken] = React.useState(false)
    const [refreshToken, setRefreshToken] = React.useState(null)

    const [isUserData, setIsUserData] = React.useState(false)
    const [userData, setUserData] = React.useState({})

    const [isProfileData, setIsProfileData] = React.useState(false)
    const [profileData, setProfileData] = React.useState({})

    const [isFeedPost, setIsFeedPost] = React.useState(false)
    const [feedPost, setFeedPost] = React.useState([])

    return <Context.Provider value={{ isAuthenticated, setIsAuthenticated, isAccessToken, setIsAccessToken, accessToken, setAccessToken, isRefreshToken, setIsRefreshToken, refreshToken, setRefreshToken, isProfileData, setIsProfileData, profileData, setProfileData, isUserData, setIsUserData, userData, setUserData, isFeedPost, setIsFeedPost, feedPost, setFeedPost }}>
        {children}
    </Context.Provider>
}