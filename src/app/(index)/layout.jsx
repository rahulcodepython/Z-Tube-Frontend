"use client"
import { AuthContext } from '@/context/AuthContext'
import CheckUserIsAuthenticated from '@/functions/CheckUserIsAuthenticated'
import React from 'react'

const IndexLayout = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { setIsAuthenticated } = React.useContext(AuthContext)

    React.useEffect(() => {
        CheckUserIsAuthenticated(sessionStorage.getItem('access') ?? null, sessionStorage.getItem('refresh') ?? null, setIsAuthenticated)
        setLoading(pre => false)
    }, [])

    return !loading && children
}

export default IndexLayout