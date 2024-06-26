"use client"
import { AuthContext, AuthContextType } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const UnAuthLayout = ({ children }: { children: React.ReactNode }) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const router = useRouter();

    const isAuthenticated = authContext?.isAuthenticated;

    if (!isAuthenticated) {
        return children;
    } else {
        router.push('/');
    }
}

export default UnAuthLayout