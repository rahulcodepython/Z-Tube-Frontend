"use client"
import React from 'react'
import Image from 'next/image'
import { BiSolidLock, BsLink, MdVerified, BiSolidLockOpen, MdAddLink } from '@/data/icons/icons'
import EditProfile from './EditProfile'
import axios from 'axios'
import { Context } from '@/context/Context'
import { useRouter } from 'next/navigation'

const ProfileTab = ({ username }) => {
    const [loading, setLoading] = React.useState(true)
    const [self, setSelf] = React.useState(false)
    const [profile, setProfile] = React.useState({})

    const router = useRouter();

    const { isAuthenticated, accessToken, isProfileData, setIsProfileData, profileData, setProfileData, userData } = React.useContext(Context)

    const FetchProfileData = async () => {
        if (isAuthenticated) {
            if (username === userData?.username) {
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
                setSelf(pre => false)
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
            setSelf(pre => false)
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

    React.useEffect(() => {
        FetchProfileData();
    }, [profileData])

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
        loading ? "Loading..." : profile === null ? <div className='flex flex-col'>
            No such User is found
        </div> : <div className='flex flex-col'>
            <Image src={profile.banner ? profile.banner : '/image/profile-banner.png'} width={1536} height={341} priority={false} className='rounded-t-lg w-[1536px] h-[341px]' alt='...' />
            <div className='bg-black text-white relative px-4 py-5'>
                <Image src={profile.image ? profile.image : '/image/user.png'} width={120} height={120} className='absolute top-[1.85rem] left-4 rounded-lg' alt='...' />
                <div className='flex flex-col items-start justify-start gap-2 mx-40'>
                    <div className='flex flex-col items-start justify-center'>
                        <div className='font-extrabold text-xl'>
                            <span>
                                {profile?.user?.first_name} {profile?.user?.last_name}
                            </span>
                            {
                                profile?.isVerified && <sup className='ml-1'>
                                    <MdVerified className='inline-block text-sm' />
                                </sup>
                            }
                        </div>
                        <span>
                            {profile?.user?.username}
                        </span>
                    </div>
                    <div className='text-sm'>
                        {profile?.bio}
                    </div>
                    <div className='flex font-semibold items-center justify-start gap-4 text-sm'>
                        {
                            profile?.tags ? JSON.parse(profile?.tags).map((item, index) => {
                                return <span key={index}>
                                    #{item}
                                </span>
                            }) : null
                        }
                    </div>
                    <div className='flex items-center justify-center gap-4'>
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
                <div className='absolute bottom-4 right-4 flex items-center justify-end gap-4'>
                    {self ? <EditProfile /> : null}
                    {
                        self ? null : isAuthenticated && profile?.isFriend ? <button className='bg-white text-black rounded-md px-4 py-2 font-semibold flex items-center justify-center gap-2' onClick={DisconnectPeople}>
                            <BsLink />
                            <span>
                                Disconnect
                            </span>
                        </button> : <button className='bg-white text-black rounded-md px-4 py-2 font-semibold flex items-center justify-center gap-2' onClick={ConnectPeople}>
                            <MdAddLink />
                            <span>
                                Connect
                            </span>
                        </button>
                    }
                    <button className='bg-white text-black rounded-md px-4 py-2 font-semibold flex items-center justify-center gap-2'>
                        {profile?.isLocked ? <BiSolidLock /> : <BiSolidLockOpen />}
                        <span>
                            Locked
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileTab