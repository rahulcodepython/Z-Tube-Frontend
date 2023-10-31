"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BiSolidLock, BsLink, MdVerified, BiSolidLockOpen } from '@/data/icons/icons'
import EditButton from './EditButton'
import axios from 'axios'
import { Context } from '@/context/Context'

const ProfileTab = ({ username }) => {
    const [loading, setLoading] = React.useState(true)

    const { isAuthenticated, accessToken, isProfileData, setIsProfileData, profileData, setProfileData } = React.useContext(Context)

    const FetchProfileData = async () => {
        if (isAuthenticated) {
            if (!isProfileData) {
                const option = {
                    headers: {
                        Authorization: `JWT ${accessToken}`
                    },
                }

                await axios.get(`${process.env.BACKEND_DOMAIN_NAME}auth/profile/${username}`, option)
                    .then(response => {
                        setIsProfileData(pre => true)
                        setProfileData(pre => response.data)
                    })
            }
        }
        setLoading(pre => false)
    }

    React.useEffect(() => {
        FetchProfileData();
    }, [])

    return (
        loading ? "Loading..." : <>
            <div className='flex flex-col'>
                <Image src={profileData.banner ? profileData.banner : '/image/profile-banner.png'} width={2250} height={500} priority={false} className='rounded-t-lg' alt='...' />
                <div className='bg-black text-white relative px-4 py-5'>
                    <Image src={profileData.image ? profileData.image : '/image/user.png'} width={120} height={120} className='absolute top-[1.85rem] left-4 rounded-lg' alt='...' />
                    <div className='flex flex-col items-start justify-start gap-2 mx-40'>
                        <div className='flex flex-col items-start justify-center'>
                            <div className='font-extrabold text-xl'>
                                <span>
                                    {profileData?.user?.first_name} {profileData?.user?.last_name}
                                </span>
                                {
                                    profileData?.isVerified && <sup className='ml-1'>
                                        <MdVerified className='inline-block text-sm' />
                                    </sup>
                                }
                            </div>
                            <span>
                                {profileData?.user?.username}
                            </span>
                        </div>
                        <div className='text-sm'>
                            {profileData?.bio}
                        </div>
                        <div className='flex font-semibold items-center justify-start gap-4 text-sm'>
                            {
                                JSON.parse(profileData?.tags).map((item, index) => {
                                    return <span key={index}>
                                        #{item}
                                    </span>
                                })
                            }
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            <div className='flex items-center justify-center gap-1 cursor-pointer'>
                                <span>{profileData?.posts}</span>
                                <span>Posts</span>
                            </div>
                            <div className='flex items-center justify-center gap-1 cursor-pointer'>
                                <span>{profileData?.followers}</span>
                                <span>Followers</span>
                            </div>
                            <div className='flex items-center justify-center gap-1 cursor-pointer'>
                                <span>{profileData?.followings}</span>
                                <span>Followings</span>
                            </div>
                        </div>
                    </div>
                    <div className='absolute bottom-4 right-4 flex items-center justify-end gap-4'>
                        <EditButton />
                        <button className='bg-white text-black rounded-md px-4 py-2 font-semibold flex items-center justify-center gap-2'>
                            <BsLink />
                            <span>
                                Connected
                            </span>
                        </button>
                        <button className='bg-white text-black rounded-md px-4 py-2 font-semibold flex items-center justify-center gap-2'>
                            {profileData?.isLocked ? <BiSolidLock /> : <BiSolidLockOpen />}
                            <span>
                                Locked
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex justify-start items-center gap-4 font-semibold uppercase bg-black px-4 py-4 rounded-b-lg'>
                <Link href={'/user'} className='px-4 py-2 text-sm bg-white text-black rounded-md cursor-pointer'>Posts</Link>
                <Link href={'/user/profile'} className='px-4 py-2 text-sm bg-white text-black rounded-md cursor-pointer'>Profile</Link>
                <Link href={'/'} className='px-4 py-2 text-sm bg-white text-black rounded-md cursor-pointer'>Friends</Link>
                <Link href={'/'} className='px-4 py-2 text-sm bg-white text-black rounded-md cursor-pointer'>videos</Link>
            </div>
        </>
    )
}

export default ProfileTab