"use client"
import React from 'react'
import Navbar from './components/server/Navbar'
import { Context } from '@/context/Context'

const Layout = ({ children }) => {
    const [showTopicAll, setShowTopicAll] = React.useState(false)
    const [toggleNavbar, setToggleNavbar] = React.useState(false)

    const { isAuthenticated, isUserData, userData } = React.useContext(Context)

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            document.documentElement.scrollTop !== 0 ? setToggleNavbar(pre => true) : setToggleNavbar(pre => false);
        });
    }, [])

    return (
        <React.Fragment>
            <Navbar isAuthenticated={isAuthenticated} isUserData={isUserData} userData={userData} toggleNavbar={toggleNavbar} showTopicAll={showTopicAll} setShowTopicAll={setShowTopicAll} />
            <main className='mt-16'>
                {children}
            </main>
        </React.Fragment>
    )
}

export default Layout