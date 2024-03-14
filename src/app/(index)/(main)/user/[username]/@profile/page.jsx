"use client"
import { AuthContext } from '@/context/AuthContext'
import React from 'react'
import Image from 'next/image'
import { BiSolidLock, BsLink, MdVerified, BiSolidLockOpen, MdAddLink } from '@/data/icons/icons'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import EditProfile from './components/client/EditProfile'
import Loading from './loading'
import axios from "axios";

const Page = ({ params }) => {
    const [loading, setLoading] = React.useState(true)
    const [profile, setProfile] = React.useState(null)

    const { accessToken, profileData, setProfileData, userData } = React.useContext(AuthContext)

    React.useEffect(() => {
        const handler = async () => {
            await FetchProfileData(params, userData, setProfile, profileData, accessToken, setProfileData);
            setLoading(pre => false)
        }

        handler();
    }, [])

    return (
        loading ? <Loading /> : profile === null ? "There is so such user." : <Card className="h-[457.66px] rounded-lg shadow-none divide-y">
            <CardHeader className='h-[297.66px] p-0 rounded-t-lg'>
                <Image src={profile?.banner ? profile?.banner : '/image/profile-banner.png'} width={1334} height={297.66} priority={true} alt='...' className='rounded-t-lg' placeholder='blur' blurDataURL="/image/profile-banner.png" style={{ width: "100%", height: "297.66px" }} />
            </CardHeader>
            <CardContent className="h-[160px] relative px-4 py-5 flex items-center justify-start gap-8">
                <Image src={profile?.image ? profile?.image : '/image/user.png'} width={120} height={120} className='rounded-lg w-[120px] h-[120px] overflow-hidden' alt='...' />
                <div className='space-y-6'>
                    <div className='space-y-1'>
                        <div className='space-y-1'>
                            <div className='font-extrabold text-xl'>
                                <span>
                                    {profile?.first_name} {profile?.last_name}
                                </span>
                                {
                                    profile?.isVerified && <sup className='ml-1'>
                                        <MdVerified className='inline-block text-sm' />
                                    </sup>
                                }
                            </div>
                            <span className='text-sm'>
                                {profile?.username}
                            </span>
                        </div>
                        <div className='text-sm'>
                            {profile?.bio}
                        </div>
                        <div className='space-x-2 text-xs'>
                            {
                                profile?.tags.map((item, index) => {
                                    return <span key={index}>
                                        #{item}
                                    </span>
                                })
                            }
                        </div>
                        <div className='flex items-center justify-center gap-4 text-sm'>
                            <div className='flex items-center justify-center gap-1 cursor-pointer'>
                                <span>{profile?.posts}</span>
                                <span>Posts</span>
                            </div>
                            <div className='flex items-center justify-center gap-1 cursor-pointer'>
                                <span>{profile?.followers}</span>
                                <span>Followers</span>
                            </div>
                            <div className='flex items-center justify-center gap-1 cursor-pointer'>
                                <span>{profile?.followings}</span>
                                <span>Followings</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='absolute bottom-5 right-4 flex items-center justify-end gap-4'>
                    {
                        profile.self ? <EditProfile setProfile={setProfile} username={params.username} /> :
                            profile?.isFriend ?
                                <Button className='flex items-center gap-2' onClick={async () => await DisconnectPeople(accessToken, params.username, profile, setProfile)}>
                                    <BsLink />
                                    <span>
                                        Disconnect
                                    </span>
                                </Button> : <Button className='flex items-center gap-2' onClick={async () => await ConnectPeople(accessToken, params.username, profile, setProfile)}>
                                    <MdAddLink />
                                    <span>
                                        Connect
                                    </span>
                                </Button>
                    }
                    {
                        profile?.isLocked ?
                            <Button>
                                <BiSolidLock />
                                <span>
                                    Locked
                                </span>
                            </Button>
                            : <Button>
                                <BiSolidLockOpen />
                                <span>
                                    Unlocked
                                </span>
                            </Button>
                    }
                </div>

            </CardContent>
        </Card>
    )
}

const FetchProfileData = async (params, userData, setProfile, profileData, accessToken, setProfileData) => {
    if (decodeURIComponent(params.username) === userData?.username && profileData !== null) {
        setProfile(pre => profileData)
    }
    else {
        const options = {
            headers: {
                Authorization: `JWT ${accessToken}`
            },
            url: `${process.env.BASE_API_URL}/auth/profile/${params.username}/`,
            method: 'GET',
        }

        await axios.request(options)
            .then(response => {
                if (response.data.self) {
                    setProfileData(pre => response.data)
                }
                setProfile(pre => response.data)
            })
            .catch(error => {
                setProfile(pre => null)
                toast.warn("There is some issue.")
            })
    }
}

const ConnectPeople = async (accessToken, username, profile, setProfile) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
        url: `${process.env.BASE_API_URL}/auth/connect/${username}/`,
        method: 'POST',
    }

    await axios.request(options)
        .then(response => setProfile({ ...profile, isFriend: true }))
}

const DisconnectPeople = async (accessToken, username, profile, setProfile) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
        url: `${process.env.BASE_API_URL}/auth/connect/${username}/`,
        method: 'DELETE',
    }

    await axios.request(options)
        .then(response => setProfile({ ...profile, isFriend: false }))
}

export default Page