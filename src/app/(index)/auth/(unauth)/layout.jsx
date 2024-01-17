"use client"
import { Context } from '@/context/Context'
import { useRouter } from 'next/navigation'
import React from 'react'

const Layout = ({ children }) => {
    const { isAuthenticated } = React.useContext(Context)
    const router = useRouter()

    if (!isAuthenticated) {
        return children
    }
    else {
        router.push('/')
    }
}

export default Layout