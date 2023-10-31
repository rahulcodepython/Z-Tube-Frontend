"use client"
import { Context } from '@/context/Context'
// import { Decrypt } from '@/functions/Decrypt'
// import { Encrypt } from '@/functions/Encrypt'
// import axios from 'axios'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'
import React from 'react'


const UserButton = () => {
    // const [loading, setLoading] = React.useState(true)
    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    // const pathname = usePathname()

    // React.useEffect(() => {

    //     const checkAuthentication = async () => {
    //         if (isAuthenticated && !isUserData) {
    //             if (sessionStorage.getItem("user")) {
    //                 setIsUserData(pre => true)
    //                 setUserData(pre => JSON.parse(Decrypt(sessionStorage.getItem("user"), process.env.ENCRYPTION_KEY)))
    //             }
    //             else {
    //                 const option = {
    //                     headers: {
    //                         Authorization: `JWT ${accessToken}`
    //                     },
    //                 }

    //                 await axios.get(`${process.env.BACKEND_DOMAIN_NAME}auth/me/`, option)
    //                     .then(response => {
    //                         setIsUserData(pre => true)
    //                         setUserData(pre => response.data)
    //                         sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data), process.env.ENCRYPTION_KEY))
    //                     })
    //             }
    //         }
    //         setLoading(pre => false)
    //     }

    //     checkAuthentication();
    // }, [pathname])

    // return loading ? 'loading ...' : 
    // isAuthenticated ? <Link href={`/admin/${userData?.username}`} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
    //     {userData?.first_name}
    // </Link> : <Link href={'/auth/login'} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
    //     Login
    // </Link>

    isAuthenticated && isUserData ? <Link href={`/admin/${userData?.username}`} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        {userData?.first_name}
    </Link> : <Link href={'/auth/login'} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        Login
    </Link>
}

export default UserButton