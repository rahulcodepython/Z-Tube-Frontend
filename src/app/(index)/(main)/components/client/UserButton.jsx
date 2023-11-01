"use client"
import { Context } from '@/context/Context'
import Link from 'next/link'
import React from 'react'


const UserButton = () => {
    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    return isAuthenticated && isUserData ? <Link href={`/admin/${userData?.username}`} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        {userData?.first_name}
    </Link> : <Link href={'/auth/login'} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        Login
    </Link>
}

export default UserButton