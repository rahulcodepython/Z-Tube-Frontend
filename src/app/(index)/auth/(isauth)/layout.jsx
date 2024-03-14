"use client"
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const Layout = ({ children }) => {
    const { isAuthenticated } = React.useContext(AuthContext)
    const router = useRouter()

    if (isAuthenticated) {
        return children
    }
    else {
        router.push('/auth/login')
    }
}

export default Layout