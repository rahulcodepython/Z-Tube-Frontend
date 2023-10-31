import React from 'react'
import ProfileTab from './components/client/ProfileTab'

const UsernameLayout = ({ children, params }) => {
    return (
        <div className='flex flex-col divide-y-2 divide-gray-200'>
            <ProfileTab username={params.username} />
            <div>
                {children}
            </div>
        </div>
    )
}

export default UsernameLayout