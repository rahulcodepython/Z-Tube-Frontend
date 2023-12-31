"use client"
import React from 'react'
import Image from 'next/image'
import { BiSolidLock, BsLink, MdVerified, BiSolidLockOpen, MdAddLink } from '@/data/icons/icons'
import EditProfile from './EditProfile'
import axios from 'axios'
import { Context } from '@/context/Context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Loader from '@/app/(index)/components/server/Loader'

const ProfileTab = ({ username }) => {
    const [loading, setLoading] = React.useState(true)
    const [self, setSelf] = React.useState(false)
    const [profile, setProfile] = React.useState({})

    const router = useRouter();

    const { isAuthenticated, accessToken, isProfileData, setIsProfileData, profileData, setProfileData, userData } = React.useContext(Context)

    React.useEffect(() => {
        const FetchProfileData = async () => {
            if (isAuthenticated) {
                if (decodeURIComponent(username) === userData?.username) {
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
                    const option = {
                        headers: {
                            Authorization: `JWT ${accessToken}`
                        },
                    }

                    await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/profile/${username}/`, option)
                        .then(response => {
                            setProfile(pre => response.data)
                        })
                        .catch(error => {
                            setProfile(pre => null)
                        })
                }
            }
            else {
                await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/profile/${username}/`)
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

    const ConnectPeople = async () => {
        if (isAuthenticated) {
            const option = {
                headers: {
                    Authorization: `JWT ${accessToken}`
                },
            }

            await axios.get(`${process.env.BACKEND_DOMAIN_NAME}/auth/connect/${username}/`, option)
                .then(response => setProfile({ ...profile, isFriend: true }))
        }
        else {
            router.push('/auth/login')
        }
    }

    const DisconnectPeople = async () => {
        const option = {
            headers: {
                Authorization: `JWT ${accessToken}`
            },
        }

        await axios.delete(`${process.env.BACKEND_DOMAIN_NAME}/auth/connect/${username}/`, option)
            .then(response => setProfile({ ...profile, isFriend: false }))
    }

    return (
        loading ? <Loader /> : profile === null ? <div className='flex flex-col'>
            No such User is found
        </div> : <div className='flex flex-col shadow-lg shadow-slate-500/50 dark:shadow-white/40 rounded-lg'>
            <Image src={profile.banner ? profile.banner : '/image/profile-banner.png'} width={1536} height={341} priority={false} className='rounded-t-lg w-[1536px] h-[341px]' alt='...' />
            <div className='dark:bg-[#020817] dark:text-white relative px-4 py-5 flex items-center justify-start gap-8'>
                <Image src={profile.image ? profile.image : '/image/user.png'} width={120} height={120} className='rounded-lg w-[120px] h-[120px]' alt='...' />
                <div className='flex flex-col items-start gap-1 justify-start'>
                    <div className='flex flex-col items-start justify-center'>
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
                    <div className='flex font-semibold items-center justify-start gap-2 text-xs'>
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
                <div className='absolute bottom-5 right-4 flex items-center justify-end gap-4'>
                    {self ? <EditProfile setProfile={setProfile} /> : null}
                    {
                        self ? null : isAuthenticated && profile?.isFriend ? <Button className='font-semibold flex items-center justify-center gap-2' onClick={DisconnectPeople}>
                            <BsLink />
                            <span>
                                Disconnect
                            </span>
                        </Button> : <button className='font-semibold flex items-center justify-center gap-2' onClick={ConnectPeople}>
                            <MdAddLink />
                            <span>
                                Connect
                            </span>
                        </button>
                    }
                    <Button>
                        {
                            profile?.isLocked ?
                                <span className='flex items-center justify-center gap-2'>
                                    <BiSolidLock />
                                    <span>
                                        Locked
                                    </span>
                                </span>
                                : <span className='flex items-center justify-center gap-2'>
                                    <BiSolidLockOpen />
                                    <span>
                                        Unlocked
                                    </span>
                                </span>
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileTab