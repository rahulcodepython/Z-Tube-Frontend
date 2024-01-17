"use client"
import { Context } from '@/context/Context'
import { useRouter } from 'next/navigation'
import React from 'react'

const Layout = ({ children }) => {
    const { isAuthenticate } = React.useContext(Context)
    const router = useRouter()

    if (isAuthenticate) {
        return children
    }
    else {
        router.push('/')
    }
}

export default Layout