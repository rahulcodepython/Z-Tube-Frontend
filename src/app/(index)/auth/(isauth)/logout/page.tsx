"use client"
import React from 'react'
import {AuthContext, AuthContextType} from '@/context/AuthContext'
import {useRouter} from "next/navigation";

const Logout = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const router = useRouter();

    React.useEffect(() => {
        const handler = async () => {
            if (authContext) {
                const LogoutUser = authContext.LogoutUser
                await LogoutUser();
            }
        }
        handler().then(() => router.push('/auth/login'))
    }, [])
}

export default Logout