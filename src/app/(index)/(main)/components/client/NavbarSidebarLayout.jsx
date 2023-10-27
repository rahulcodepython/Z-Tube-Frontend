"use client"
import React from 'react'
import Navbar from '../server/Navbar'
import Sidebar from '../server/Sidebar'

const NavbarSidebarLayout = () => {
    const [toggleSidebar, setToggleSidebar] = React.useState(false)
    const [toggleNavbar, setToggleNavbar] = React.useState(false)

    const sidebarRef = React.useRef(null)

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            document.documentElement.scrollTop !== 0 ? setToggleNavbar(pre => true) : setToggleNavbar(pre => false);
        });
    }, [])

    const handleToggle = (event) => {
        (sidebarRef.current && sidebarRef.current.contains(event.target)) ? setToggleSidebar(pre => true) : setToggleSidebar(pre => false);
    }

    React.useEffect(() => {
        document.addEventListener('click', handleToggle);
        return () => {
            document.removeEventListener('click', handleToggle);
        };
    }, [toggleSidebar]);

    return (
        <>
            <Navbar setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar} toggleNavbar={toggleNavbar} />
            <Sidebar setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} />
        </>
    )
}

export default NavbarSidebarLayout