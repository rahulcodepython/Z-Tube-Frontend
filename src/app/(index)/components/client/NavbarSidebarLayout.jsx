"use client"
import React from 'react'
import Navbar from '@/app/(index)/components/server/Navbar'
import Sidebar from '@/app/(index)/components/server/Sidebar'

const NavbarSidebarLayout = () => {
    const [toggleSidebar, setToggleSidebar] = React.useState(false)
    const [toggleNavbar, setToggleNavbar] = React.useState(false)

    React.useEffect(() => {
        document.body.addEventListener("click", () => {
            setToggleSidebar(false)
        })
        window.addEventListener("scroll", () => {
            document.documentElement.scrollTop !== 0 ? setToggleNavbar(true) : setToggleNavbar(false);
        });
    }, [])

    return (
        <>
            <Navbar setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar} toggleNavbar={toggleNavbar} />
            <Sidebar setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar} />
        </>
    )
}

export default NavbarSidebarLayout