"use client"
import { AuthContext } from '@/context/AuthContext'
import React from 'react'

const AuthenticateUser = () => {
    const { setIsAuthenticated } = React.useContext(AuthContext)

    React.useEffect(() => {
        const access = sessionStorage.getItem('access') ?? null;
        const refresh = localStorage.getItem('refresh') ?? null;

        console.log("access", access);
        console.log("refresh", refresh);

        if (access || refresh) {
            console.log("Auth true");
            setIsAuthenticated(pre => true)
        }
        else {
            console.log("Auth false");
            setIsAuthenticated(pre => false)
        }

    }, [])

    return ""
}

export default AuthenticateUser
