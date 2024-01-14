import React from 'react'
import Image from 'next/image'
import { BiSolidLock, BsLink, MdVerified, BiSolidLockOpen, MdAddLink } from '@/data/icons/icons'
import EditProfile from '../client/EditProfile'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify';
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"

const ProfileTab = ({ self, profile, setProfile, isAuthenticated }) => {
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
            toast.warn("Please Login first to connect people.")
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
        <Card className="h-[457.66px] rounded-lg shadow-none divide-y">
            <CardHeader className='h-[297.66px] p-0'>
                <Image src={profile?.banner ? profile?.banner : '/image/profile-banner.png'} width={1334} height={297.66} priority={true} className='rounded-t-lg w-[1334px] h-[297.66px]' alt='...' placeholder='blur' blurDataURL="/image/profile-banner.png" style={{ "width": "auto", "height": "auto" }} />
            </CardHeader>
            <CardContent className="h-[160px] relative px-4 py-5 flex items-center justify-start gap-8">
                <Image src={profile?.image ? profile?.image : '/image/user.png'} width={120} height={120} className='rounded-lg w-[120px] h-[120px]' alt='...' />
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
                    {self ? <EditProfile setProfile={setProfile} /> :
                        isAuthenticated && profile?.isFriend ?
                            <Button className='flex items-center gap-2' onClick={DisconnectPeople}>
                                <BsLink />
                                <span>
                                    Disconnect
                                </span>
                            </Button> : <Button className='flex items-center gap-2' onClick={ConnectPeople}>
                                <MdAddLink />
                                <span>
                                    Connect
                                </span>
                            </Button>
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

            </CardContent>
        </Card>
    )
}

export default ProfileTab