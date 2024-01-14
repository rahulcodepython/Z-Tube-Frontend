"use client"
import React from 'react'
import ProfileTab from './components/server/ProfileTab'
import {
    Menubar,
    MenubarMenu,
} from "@/components/ui/menubar"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Context } from '@/context/Context'
import ProfileLoadingSkeleton from './components/server/ProfileLoadingSkeleton'
import { FetchProfileData } from '@/utils'

const UsernameLayout = ({ children, params }) => {
    const [loading, setLoading] = React.useState(true)
    const [self, setSelf] = React.useState(false)
    const [profile, setProfile] = React.useState({})

    const { isAuthenticated, accessToken, isProfileData, setIsProfileData, profileData, setProfileData, userData } = React.useContext(Context)

    React.useEffect(() => {
        const handler = async () => {
            await FetchProfileData(isAuthenticated, params, userData, setSelf, isProfileData, setProfile, profileData, accessToken, setIsProfileData, setProfileData);
            setLoading(pre => false)
        }

        handler();
    }, [])

    return (
        loading ? <ProfileLoadingSkeleton /> : profile === null ? <div className='flex flex-col'>
            No such User is found
        </div> : <section className='space-y-4'>
            <div className='space-y-4'>
                <ProfileTab self={self} profile={profile} setProfile={setProfile} isAuthenticated={isAuthenticated} />
                <Menubar className="p-0 mt-2 h-auto dark:bg-darkModeBG border-none shadow-none space-x-2">
                    <MenubarMenu>
                        <Link href={`/admin/${params.username}/`}>
                            <Button>Profile</Button>
                        </Link>
                    </MenubarMenu>
                    <MenubarMenu>
                        <Link href={'#'}>
                            <Button>Friends</Button>
                        </Link>
                    </MenubarMenu>
                    <MenubarMenu>
                        <Link href={`/admin/${params.username}/feed/`}>
                            <Button>Feed</Button>
                        </Link>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div>
                {children}
            </div>
        </section>
    )
}

export default UsernameLayout