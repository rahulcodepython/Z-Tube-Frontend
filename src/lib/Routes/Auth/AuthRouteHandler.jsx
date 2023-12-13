"use client"
import React from 'react'
import { Context } from '@/context/Context'
import { usePathname, useRouter } from 'next/navigation'
import { AuthenticatedRoute, UnauthenticatedRoute } from '@/lib/Routes/Auth/Routes'

const AuthRouteHandler = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { isAuthenticated } = React.useContext(Context)

    const pathname = usePathname()
    const router = useRouter()

    React.useEffect(() => {

        const UnauthenticatedRouteMatcher = () => UnauthenticatedRoute.some(route =>
            (pathname.length === route.length && pathname == route) ||
            (pathname.length > route.length && pathname.includes(route)) ||
            (route.includes(pathname))
        );

        const AuthenticatedRouteMatcher = () => AuthenticatedRoute.some(route =>
            (pathname.length === route.length && pathname == route) ||
            (pathname.length > route.length && pathname.includes(route)) ||
            (route.includes(pathname))
        );

        const Handler = () => {
            isAuthenticated ? AuthenticatedRouteMatcher() ? null : router.push("/") : UnauthenticatedRouteMatcher() ? null : router.push("/")
            setLoading(pre => false)
        }

        Handler();
    }, [pathname])

    return loading ? "Loading..." : children
}

export default AuthRouteHandler