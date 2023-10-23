"use client"
import { AuthContext } from '@/context/AuthContext'
import CheckUserIsAuthenticated from '@/functions/CheckUserIsAuthenticated'
import FetchNewAccessToken from '@/functions/FetchNewAccessToken'
import React from 'react'

const IndexLayout = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext)

    const SetAccessToken = () => {
        if (!sessionStorage.getItem('access') && isAuthenticated) {
            FetchNewAccessToken();
        }
    }

    React.useEffect(() => {
        CheckUserIsAuthenticated(sessionStorage.getItem('access') ?? null, localStorage.getItem('refresh') ?? null, setIsAuthenticated)
        SetAccessToken();
        setLoading(pre => false)
    }, [])

    return !loading && children
}

export default IndexLayout