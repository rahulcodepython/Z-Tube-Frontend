import React from 'react'
import NavbarSidebarLayout from './components/client/NavbarSidebarLayout'

const MainLayout = ({ children }) => {
    return (
        <>
            <NavbarSidebarLayout />
            {children}
        </>
    )
}

export default MainLayout