"use client"
import React from 'react'
import { AuthContext } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { UnauthenticatedRoute } from '@/lib/Routes'

const RouteHandler = ({ children }) => {
    const [loading, setLoading] = React.useState(true)
    const { isAuthenticated } = React.useContext(AuthContext)

    const pathname = usePathname()
    const router = useRouter()

    const Handler = () => {
        if (!isAuthenticated) {
            console.log(isAuthenticated);
            for (const route of UnauthenticatedRoute) {
                console.log(route);
                if (pathname.includes(route)) {
                    console.log("Match found");
                    setLoading(pre => false);
                    break;
                }
                else {
                    router.back("/")
                }
            }
        }
    }

    React.useEffect(() => {
        Handler();
    }, [])

    return !loading && children
}

export default RouteHandler