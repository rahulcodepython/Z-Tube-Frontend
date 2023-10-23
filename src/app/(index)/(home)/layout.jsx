import React from 'react'
import NavbarSidebarLayout from './components/client/NavbarSidebarLayout'

const HomeLayout = ({ children }) => {
    return (
        <>
            <NavbarSidebarLayout />
            {children}
        </>
    )
}

export default HomeLayout