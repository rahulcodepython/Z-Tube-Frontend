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
import EditProfile from "@/app/(index)/(main)/user/[username]/@profile/components/client/EditProfile";
import Loading from "@/app/(index)/(main)/user/[username]/@profile/components/server/loading";
import axios from "axios";
import { toast } from 'react-toastify'
import { ProfileContext } from '@/context/ProfileContext'

const Profile = ({ params }) => {
    const { accessToken } = React.useContext(AuthContext)
    const { setProfile } = React.useContext(ProfileContext)

    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')

    React.useEffect(() => {
        const handler = async () => {
            await FetchProfileData(params, accessToken, setProfile, setError, setErrorMsg, setLoading);
        }
        handler();
    }, [])

    return (
        loading ? <Loading /> : <ProfileCard params={params} error={error} errorMsg={errorMsg} />
    )
}

const ProfileCard = ({ params, error, errorMsg }) => {
    const { accessToken } = React.useContext(AuthContext)

    const { profile, setProfile } = React.useContext(ProfileContext)

    return error ? <div className='py-4'>
        {errorMsg}
    </div> : <Card className="h-[457.66px] rounded-lg shadow-none divide-y">
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
                    profile?.self ? <EditProfile profileData={profile} username={params.username} /> :
                        profile?.isFriend ?
                            <Button className='gap-[0.5rem]' onClick={async () => await DisconnectPeople(accessToken, params.username, setProfile)}>
                                <BsLink />
                                <span>
                                    Disconnect
                                </span>
                            </Button> : <Button className='gap-[0.5rem]' onClick={async () => await ConnectPeople(accessToken, params.username, setProfile)}>
                                <MdAddLink />
                                <span>
                                    Connect
                                </span>
                            </Button>
                }
                {
                    profile?.isLocked ?
                        <Button className={'gap-[0.5rem]'}>
                            <BiSolidLock />
                            <span>
                                Locked
                            </span>
                        </Button>
                        : <Button className={'gap-[0.5rem]'}>
                            <BiSolidLockOpen />
                            <span>
                                Unlocked
                            </span>
                        </Button>
                }
            </div>

        </CardContent>
    </Card>
}

const FetchProfileData = async (params, accessToken, setProfile, setError, setErrorMsg, setLoading) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
        url: `${process.env.BASE_API_URL}/auth/profile/${params.username}/`,
        method: 'GET',
    }

    await axios.request(options).then(response => {
        setProfile(response.data)
    }).catch(error => {
        setError(() => true)
        setErrorMsg(() => error.response.data?.msg ?? 'There is some issue')
    }).finally(() => setLoading(() => false))
}

const ConnectPeople = async (accessToken, username, setProfile) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
        url: `${process.env.BASE_API_URL}/auth/connect/${username}/`,
        method: 'POST',
    }

    await axios.request(options).then(response => {
        setProfile((pre) => {
            return {
                ...pre,
                isFriend: true,
                followers: pre.followers + 1
            }
        });
        toast.success(response.data.success)
    })
}

const DisconnectPeople = async (accessToken, username, setProfile) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
        url: `${process.env.BASE_API_URL}/auth/connect/${username}/`,
        method: 'DELETE',
    }

    await axios.request(options).then(response => {
        setProfile((pre) => {
            return {
                ...pre,
                isFriend: false,
                followers: pre.followers - 1
            }
        });
        toast.success(response.data.success)
    })
}

export default Profile