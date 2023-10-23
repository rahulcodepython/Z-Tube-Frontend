"use client"
import { AuthContext } from '@/context/AuthContext'
import CheckUserIsAuthenticated from '@/functions/CheckUserIsAuthenticated'
import Link from 'next/link'
import React from 'react'


const UserButton = () => {
    const [loading, setLoading] = React.useState(true)
    const [user, setUser] = React.useState(null)
    const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext)

    const checkAuthentication = () => {
        if (isAuthenticated) {
            const name = sessionStorage.getItem('first_name') ?? 'Guest'
            const username = sessionStorage.getItem('username') ?? 'Guest'
            setUser({ "name": name, "username": username })
        }
        setLoading(pre => false)
    }

    React.useEffect(() => {
        CheckUserIsAuthenticated(sessionStorage.getItem('access'), localStorage.getItem('refresh'), setIsAuthenticated)
        checkAuthentication();
    }, [])

    return loading ? 'loading ...' : user === null ? <Link href={'/auth/login'} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        Login
    </Link> : <Link href={`/user/${user?.username}`} className="px-3 py-2 bg-gray-300 text-black rounded-lg hover:scale-105 duration-300">
        {user?.name}
    </Link>
}

export default UserButton
// {/* <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" alt="User dropdown" /> */}