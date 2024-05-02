"use client"
import {AuthContext, AuthContextType} from '@/context/AuthContext'
import {useRouter} from 'next/navigation'
import React from 'react'

const IsAuthLayout = ({children}: { children: React.ReactNode }) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const router = useRouter()

    if (authContext) {
        const {isAuthenticated} = authContext
        if (isAuthenticated) {
            return children
        } else {
            router.push('/auth/login');
        }
    }
}

export default IsAuthLayout