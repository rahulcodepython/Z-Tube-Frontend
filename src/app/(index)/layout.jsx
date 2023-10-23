"use client"
import { AuthContext } from '@/context/AuthContext'
import CheckUserIsAuthenticated from '@/functions/CheckUserIsAuthenticated'
import { Decrypt } from '@/functions/Decrypt'
import { Encrypt } from '@/functions/Encrypt'
import axios from 'axios'
import React from 'react'

const IndexLayout = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { setIsAuthenticated } = React.useContext(AuthContext)

    const FetchNewAccessToken = async () => {
        const values = {
            "refresh": Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY)
        }
        await axios.post(`${process.env.BACKEND_DOMAIN_NAME}user/auth/jwt/refresh/`, values)
            .then(response => {
                sessionStorage.setItem('access', Encrypt(response.data.access, process.env.ENCRYPTION_KEY))
                localStorage.setItem('refresh', Encrypt(response.data.refresh, process.env.ENCRYPTION_KEY))
            })
            .catch(error => console.log(error))
    }

    const SetAccessToken = () => {
        if (!sessionStorage.getItem('access')) {
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