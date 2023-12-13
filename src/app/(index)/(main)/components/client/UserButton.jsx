"use client"
import { Context } from '@/context/Context'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserButton = () => {
    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    return isAuthenticated && isUserData ? <Link href={`/admin/${userData?.username}`}>
        <Image src={userData.image ? userData.image : '/image/user.png'} width={50} height={20} alt='...' className='rounded-full w-10 h-10' />
    </Link> : <Link href={'/auth/login'} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        Login
    </Link>
}

export default UserButton