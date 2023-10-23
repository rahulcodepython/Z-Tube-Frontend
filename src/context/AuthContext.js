"use client"
import React from "react";

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    // const [isAdmin, setIsAdmin] = React.useState(false)
    // const [accessToken, setAccessToken] = React.useState('')
    // const [refreshToken, setRefreshToken] = React.useState('')
    // const [isAccessTokenValid, setIsAccessTokenValid] = React.useState(false)

    return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {/* return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin, accessToken, setAccessToken, refreshToken, setRefreshToken, isAccessTokenValid, setIsAccessTokenValid }}> */}
        {children}
    </AuthContext.Provider>
}