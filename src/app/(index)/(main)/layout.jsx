"use client"
import React from 'react'
import Navbar from './components/server/Navbar'
import { Context } from '@/context/Context'
import { useRouter } from 'next/navigation'

const Layout = ({ children }) => {
    const [showTopicAll, setShowTopicAll] = React.useState(false)
    const [toggleNavbar, setToggleNavbar] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    const router = useRouter()

    React.useEffect(() => {
        if (isAuthenticated) {
            setLoading(pre => false)
            window.addEventListener("scroll", () => {
                document.documentElement.scrollTop !== 0 ? setToggleNavbar(pre => true) : setToggleNavbar(pre => false);
            });
        }
        else {
            router.push('/auth/login')
        }
    }, [])

    return (
        !loading && <React.Fragment>
            <Navbar isUserData={isUserData} userData={userData} toggleNavbar={toggleNavbar} showTopicAll={showTopicAll} setShowTopicAll={setShowTopicAll} />
            <main className='mt-16'>
                {children}
            </main>
        </React.Fragment>
    )
}

export default Layout