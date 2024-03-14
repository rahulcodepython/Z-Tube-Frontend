import axios from 'axios'
import React from 'react'

const Layout = async ({ success, failure, params }) => {
    try {
        await axios.post(`${process.env.BASE_API_URL}/auth/dj/users/activation/`, {
            uid: params.uid, token: params.token
        })

        return <div className='flex justify-center items-center w-screen h-screen'>
            {success}
        </div>

    } catch (error) {
        return <div className='flex justify-center items-center w-screen h-screen'>
            {failure}
        </div>
    }
}

export default Layout