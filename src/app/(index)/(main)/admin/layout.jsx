import React from 'react'

const AdminLayout = ({ children }) => {
    return (
        <section className='my-4 mx-auto container'>
            {children}
        </section>
    )
}

export default AdminLayout