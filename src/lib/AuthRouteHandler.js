"use client"
import React from 'react'
import { Context } from '@/context/Context'
import { usePathname, useRouter } from 'next/navigation'
import { AuthenticatedRoute, UnauthenticatedRoute } from '@/lib/Routes'
import CheckUserIsAuthenticated from '@/functions/CheckUserIsAuthenticated'

const AuthRouteHandler = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { isAuthenticated, setIsAuthenticated } = React.useContext(Context)

    const pathname = usePathname()
    const router = useRouter()

    const UnauthenticatedRouteMatcher = () => {
        let result = false
        UnauthenticatedRoute.map(route => {
            if (pathname.length === route.length) {
                if (pathname == route) {
                    result = true;
                }
            }
            else if (pathname.length > route.length) {
                if (pathname.includes(route)) {
                    result = true;
                }
            }
            else {
                if (route.includes(pathname)) {
                    result = true;
                }
            }
        })
        return result
    }

    const AuthenticatedRouteMatcher = () => {
        let result = false
        AuthenticatedRoute.map(route => {
            if (pathname.length === route.length) {
                if (pathname == route) {
                    result = true;
                }
            }
            else if (pathname.length > route.length) {
                if (pathname.includes(route)) {
                    result = true;
                }
            }
            else {
                if (route.includes(pathname)) {
                    result = true;
                }
            }
        })
        return result
    }

    const Handler = () => {
        console.log(isAuthenticated, 'isauthenticated in auth route handler');
        if (isAuthenticated) {
            const routeMatch = AuthenticatedRouteMatcher()
            routeMatch ? setLoading(pre => false) : router.push("/");
        }
        else {
            const routeMatch = UnauthenticatedRouteMatcher()
            routeMatch ? setLoading(pre => false) : router.push("/");
        }
    }

    React.useEffect(() => {
        CheckUserIsAuthenticated(sessionStorage.getItem('access'), localStorage.getItem('refresh'), setIsAuthenticated)
        Handler();
    }, [router.pathname])

    return !loading && children
}

export default AuthRouteHandler