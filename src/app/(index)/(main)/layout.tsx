"use client"
import {AuthContext, AuthContextType} from '@/context/AuthContext'
import {useRouter} from 'next/navigation'
import React, {useContext} from 'react';
import Navbar from "@/app/(index)/(main)/components/server/Navbar";

const MainLayout = ({children}: { children: React.ReactNode }) => {
    const [showTopicAll, setShowTopicAll] = React.useState<boolean>(false)
    const [toggleNavbar, setToggleNavbar] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true)

    const authContext = useContext<AuthContextType | undefined>(AuthContext);

    const router = useRouter()

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            document.documentElement.scrollTop !== 0 ? setToggleNavbar(() => true) : setToggleNavbar(() => false);
        });
        setLoading(() => false)
    }, [])

    if (authContext) {
        const {isAuthenticated, user} = authContext

        if (isAuthenticated) {
            return !loading && <React.Fragment>
                <Navbar user={user} toggleNavbar={toggleNavbar} showTopicAll={showTopicAll}
                        setShowTopicAll={setShowTopicAll}/>
                <main className='py-16'>
                    {children}
                </main>
            </React.Fragment>
        } else {
            router.push('/auth/login')
        }
    }
}

export default MainLayout