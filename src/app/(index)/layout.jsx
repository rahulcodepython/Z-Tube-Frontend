import NavbarSidebarLayout from '@/app/(index)/components/client/NavbarSidebarLayout'
import React from 'react'

const IndexLayout = ({ children }) => {
    return (
        <>
            <NavbarSidebarLayout />
            {children}
        </>
    )
}

export default IndexLayout