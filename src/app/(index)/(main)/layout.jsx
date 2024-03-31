"use client"
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react';
import Navbar from "@/app/(index)/(main)/components/server/Navbar";

const MainLayout = ({ children }) => {
    const [showTopicAll, setShowTopicAll] = React.useState(false)
    const [toggleNavbar, setToggleNavbar] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    const { isAuthenticated, userData } = React.useContext(AuthContext)

    const router = useRouter()

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            document.documentElement.scrollTop !== 0 ? setToggleNavbar(() => true) : setToggleNavbar(() => false);
        });
        setLoading(() => false)
    }, [])

    if (isAuthenticated) {
        return !loading && <React.Fragment>
            <Navbar userData={userData} toggleNavbar={toggleNavbar} showTopicAll={showTopicAll} setShowTopicAll={setShowTopicAll} />
            <main className='mt-16'>
                {children}
            </main>
        </React.Fragment>
    }
    else {
        router.push('/auth/login')
    }
}

export default MainLayout