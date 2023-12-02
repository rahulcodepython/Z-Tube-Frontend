import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="md:w-1/2 px-5 flex flex-col items-center justify-center gap-6">
            <Image src={'/gif/success.gif'} width={200} height={200} alt='success' className='mix-blend-multiply' />
            <div className='text-green-600 text-3xl font-extrabold'>
                Success
            </div>
            <div>
                You are now logout
            </div>
            <Link href={'/auth/login'} className='px-4 py-2 rounded-lg bg-green-600 text-white'>
                Go to Login
            </Link>
        </div>
    )
}

export default page