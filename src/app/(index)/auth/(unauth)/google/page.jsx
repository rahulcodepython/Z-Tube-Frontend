"use client"
import { FetchUserData } from '@/app/(index)/layout'
import Loading from '@/components/Loading'
import { AuthContext } from '@/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Google = () => {
    const [loading, setLoading] = React.useState(true)

    const { LoggedInUser, setUserData } = React.useContext(AuthContext)

    const router = useRouter()
    const searchParams = useSearchParams()

    React.useEffect(() => {
        const handler = async () => {
            const access = searchParams.get('access')
            const refresh = searchParams.get('refresh')

            if (!access || !refresh) {
                router.push('/auth/login/')
            }
            else {
                await LoggedInUser(access, refresh)
                await FetchUserData(access, setUserData);

                router.push('/');
            }
        }
        handler().finally(() => setLoading(() => false))
    }, [])

    return loading && <Loading />
}

export default Google