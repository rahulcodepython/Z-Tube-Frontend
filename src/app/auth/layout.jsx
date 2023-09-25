import Image from 'next/image';
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <section className="border-red-500 bg-gray-200 w-full h-full flex items-center justify-center">
            <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-6xl">
                {children}
                <div className="w-1/2 md:block hidden">
                    <Image src="/image/loginPage.png" alt="page img" width={800} height={800} className="rounded-2xl" />
                </div>
            </div>
        </section>
    )
}

export default AuthLayout