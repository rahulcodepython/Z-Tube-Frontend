import React from 'react'
import Navbar from './components/client/Navbar'

const MainLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <main className='mt-16'>
                {children}
            </main>
        </React.Fragment>
    )
}

export default MainLayout