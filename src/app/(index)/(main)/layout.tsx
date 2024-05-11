"use client"
import { AuthContext, AuthContextType } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react';
import Navbar from "@/app/(index)/(main)/components/server/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [showTopicAll, setShowTopicAll] = React.useState<boolean>(false)
    const [toggleNavbar, setToggleNavbar] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true)

    const authContext = useContext<AuthContextType | undefined>(AuthContext);
    const isAuthenticated = authContext?.isAuthenticated
    const user = authContext?.user

    const router = useRouter()

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            document.documentElement.scrollTop !== 0 ? setToggleNavbar(() => true) : setToggleNavbar(() => false);
        });
        setLoading(() => false)
    }, [])

    if (isAuthenticated) {
        return !loading && <React.Fragment>
            <Navbar user={user} toggleNavbar={toggleNavbar} showTopicAll={showTopicAll}
                setShowTopicAll={setShowTopicAll} />
            <main className=''>
                {children}
            </main>
        </React.Fragment>
    } else {
        return router.push('/auth/login')
    }
}

export default MainLayout