"use client"
import React from 'react'
import { AuthContext } from '@/context/AuthContext'

const Logout = () => {
    const { LogoutUser: LogoutUser } = React.useContext(AuthContext)

    React.useEffect(() => {
        const handler = async () => {
            await LogoutUser();
        }

        handler().then(() => null)
    }, [])
}

export default Logout