"use client"
import React from "react";

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)

    const [isAccessToken, setIsAccessToken] = React.useState(false)
    const [accessToken, setAccessToken] = React.useState(null)

    const [isRefreshToken, setIsRefreshToken] = React.useState(false)
    const [refreshToken, setRefreshToken] = React.useState(null)

    return <Context.Provider value={{ isAuthenticated, setIsAuthenticated, isAccessToken, setIsAccessToken, accessToken, setAccessToken, isRefreshToken, setIsRefreshToken, refreshToken, setRefreshToken }}>
        {children}
    </Context.Provider>
}