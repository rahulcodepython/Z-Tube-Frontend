"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Context } from '@/context/Context'

const page = () => {
    const { isAuthenticated, setIsAuthenticated, isAccessToken, setIsAccessToken, accessToken, setAccessToken, isRefreshToken, setIsRefreshToken, refreshToken, setRefreshToken, isUserData, setIsUserData, userData, setUserData } = React.useContext(Context)

    React.useEffect(() => {
        sessionStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        setIsAuthenticated(pre => false);
        setIsAccessToken(pre => false);
        setAccessToken(pre => null);
        setIsRefreshToken(pre => false);
        setRefreshToken(pre => null);
    }, [])

    return (
        <div className="md:w-1/2 px-5 flex flex-col items-center justify-center gap-6">
            <Image src={'/gif/success.gif'} width={200} height={200} alt='success' className='mix-blend-multiply' />
            <div className='text-green-600 text-3xl font-extrabold'>
                Success
            </div>
            <div>
                You are now logout
            </div>
            <Link href={'/auth/login'} className='px-4 py-2 rounded-lg bg-green-600 text-white'>
                Go to Login
            </Link>
        </div>
    )
}

export default page