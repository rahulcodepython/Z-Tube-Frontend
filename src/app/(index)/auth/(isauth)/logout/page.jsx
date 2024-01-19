"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Context } from '@/context/Context'
import { Button } from '@/components/ui/button'
import { LogoutUser } from '@/utils'
import Loading from './loading'

const page = () => {
    const [loading, setLoading] = React.useState(true)
    const { isAuthenticated, setIsAuthenticated, isAccessToken, setIsAccessToken, accessToken, setAccessToken, isRefreshToken, setIsRefreshToken, refreshToken, setRefreshToken, isProfileData, setIsProfileData, profileData, setProfileData, isUserData, setIsUserData, userData, setUserData } = React.useContext(Context)

    React.useEffect(() => {
        const handler = async () => {
            await LogoutUser(setIsAuthenticated, setIsAccessToken, setIsRefreshToken, setIsUserData, setAccessToken, setRefreshToken, setUserData)
            setLoading(pre => false)
        }

        handler()
    }, [])

    return (
        loading ? <Loading /> : <div className="px-5 flex flex-col items-center justify-center gap-6">
            <Image src={'/gif/success.gif'} width={200} height={200} alt='success' className='mix-blend-multiply' />
            <div className='text-green-600 text-3xl font-extrabold'>
                Success
            </div>
            <div>
                You are now logout
            </div>
            <Link href={'/auth/login'}>
                <Button className="bg-green-500">
                    Go to Login
                </Button>
            </Link>
        </div>
    )
}

export default page