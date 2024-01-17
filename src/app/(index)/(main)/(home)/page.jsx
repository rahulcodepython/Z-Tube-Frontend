import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col'>
            <span>
                Home
            </span>
            <Link href={'/auth/verify/password/'}>fun {'>'} newfun</Link>
            <Link href={'/auth/verify/email/123/456'}>fun {'>'} authfun</Link>
        </div>
    )
}

export default page