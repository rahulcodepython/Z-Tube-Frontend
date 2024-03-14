"use client"
import React from 'react'
import { AuthContext } from '@/context/AuthContext'

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { LogoutUser: LogoutUser } = React.useContext(AuthContext)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        const handler = async () => {
            await LogoutUser();
        }

        handler().then(() => null)
    }, [])
}

export default page