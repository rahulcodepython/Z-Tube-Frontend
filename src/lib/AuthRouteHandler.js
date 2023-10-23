"use client"
import React from 'react'
import { AuthContext } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { AuthenticatedRoute, UnauthenticatedRoute } from '@/lib/Routes'
import CheckUserIsAuthenticated from '@/functions/CheckUserIsAuthenticated'

const AuthRouteHandler = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext)

    const pathname = usePathname()
    const router = useRouter()

    const UnauthenticatedRouteMatcher = () => {
        let result = false
        UnauthenticatedRoute.map(route => {
            if (pathname.includes(route)) {
                result = true;
            }
        })
        return result
    }

    const AuthenticatedRouteMatcher = () => {
        let result = false
        AuthenticatedRoute.map(route => {
            if (pathname.includes(route)) {
                result = true;
            }
        })
        return result
    }

    const Handler = () => {
        if (!isAuthenticated) {
            const routeMatch = UnauthenticatedRouteMatcher()
            routeMatch ? setLoading(pre => false) : router.push("/");
        }
        else {
            const routeMatch = AuthenticatedRouteMatcher()
            routeMatch ? setLoading(pre => false) : router.push("/");
        }
    }

    React.useEffect(() => {
        CheckUserIsAuthenticated(sessionStorage.getItem('access'), localStorage.getItem('refresh'), setIsAuthenticated)
        Handler();
    }, [])

    return !loading && children
}

export default AuthRouteHandler