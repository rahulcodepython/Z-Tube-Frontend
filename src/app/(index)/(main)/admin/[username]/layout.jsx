"use client"
import React from 'react'
import ProfileTab from './components/server/ProfileTab'
import {
    Menubar,
    MenubarMenu,
} from "@/components/ui/menubar"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import { Context } from '@/context/Context'
import ProfileLoadingSkeleton from './components/server/ProfileLoadingSkeleton'

const UsernameLayout = ({ children, params }) => {
    const [loading, setLoading] = React.useState(true)
    const [self, setSelf] = React.useState(false)
    const [profile, setProfile] = React.useState({})

    const { isAuthenticated, accessToken, isProfileData, setIsProfileData, profileData, setProfileData, userData } = React.useContext(Context)

    React.useEffect(() => {
        const FetchProfileData = async () => {
            if (isAuthenticated && decodeURIComponent(params.username) === userData?.username) {
                setSelf(pre => true);
                if (isProfileData) {
                    setProfile(pre => profileData)
                }
                else {
                    const option = {
                        headers: {
                            Authorization: `JWT ${accessToken}`
                        },
                    }

                    await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/profile/`, option)
                        .then(response => {
                            setIsProfileData(pre => true)
                            setProfileData(pre => response.data)
                            setProfile(pre => response.data)
                        })
                }
            }
            else {
                const option = isAuthenticated ? {
                    headers: {
                        Authorization: `JWT ${accessToken}`
                    },
                } : {}

                await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/profile/${params.username}/`, option)
                    .then(response => {
                        setProfile(pre => response.data)
                    })
                    .catch(error => {
                        setProfile(pre => null)
                    })
            }
            setLoading(pre => false)
        }

        FetchProfileData();
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