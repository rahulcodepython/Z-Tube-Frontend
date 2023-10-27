"use client"
import { Context } from '@/context/Context'
import { Decrypt } from '@/functions/Decrypt'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'


const UserButton = () => {
    const [loading, setLoading] = React.useState(true)
    const [user, setUser] = React.useState(null)
    const { isAuthenticated, setIsAuthenticated } = React.useContext(Context)

    const checkAuthentication = async () => {
        if (sessionStorage.getItem("user")) {
            setUser(pre => JSON.parse(sessionStorage.getItem("user")))
        }
        else {
            if (isAuthenticated && sessionStorage.getItem('access')) {
                const option = {
                    headers: {
                        Authorization: `JWT ${Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY)}`
                    },
                }
                await axios.get(`${process.env.BACKEND_DOMAIN_NAME}user/me/`, option)
                    .then(response => {
                        setUser(pre => response.data)
                        sessionStorage.setItem("user", JSON.stringify(response.data))
                    })
                    .catch(error => setUser(pre => null))
            }
        }
    }

    React.useEffect(() => {
        checkAuthentication();
        setLoading(pre => false)
    }, [isAuthenticated])

    return loading ? 'loading ...' : user === null ? <Link href={'/auth/login'} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        Login
    </Link> : <Link href={`/user/${user?.username}`} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        {user?.first_name}
    </Link>
}

export default UserButton