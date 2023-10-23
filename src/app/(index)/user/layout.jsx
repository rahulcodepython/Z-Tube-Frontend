import React from 'react'

const UserLayout = ({ children }) => {
    return (
        <section className='my-4 mx-auto container'>
            {children}
        </section>
    )
}

export default UserLayout