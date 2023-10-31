import React from 'react'
import ProfileTab from './components/client/ProfileTab'
import Link from 'next/link'

const UsernameLayout = ({ children, params }) => {
    return (
        <div className='flex flex-col divide-y-2 divide-gray-200'>
            <ProfileTab username={params.username} />
            <div className='flex justify-start items-center gap-4 font-semibold uppercase bg-black px-4 py-4 rounded-b-lg'>
                <Link href={'/user'} className='px-4 py-2 text-sm bg-white text-black rounded-md cursor-pointer'>Posts</Link>
                <Link href={'/user/profile'} className='px-4 py-2 text-sm bg-white text-black rounded-md cursor-pointer'>Profile</Link>
                <Link href={'/'} className='px-4 py-2 text-sm bg-white text-black rounded-md cursor-pointer'>Friends</Link>
                <Link href={'/'} className='px-4 py-2 text-sm bg-white text-black rounded-md cursor-pointer'>videos</Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default UsernameLayout