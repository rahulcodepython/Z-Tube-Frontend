import React from 'react'
import NavbarSidebarLayout from './components/client/NavbarSidebarLayout'

const MainLayout = ({ children }) => {
    return (
        <>
            <NavbarSidebarLayout />
            <main className='mt-16'>
                {children}
            </main>
        </>
    )
}

export default MainLayout