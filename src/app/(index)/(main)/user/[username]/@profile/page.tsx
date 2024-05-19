"use client"
import { AccessToken, AuthContext, AuthContextType, ProfileType, UserType } from '@/context/AuthContext'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import axios from "axios";
import { toast } from 'react-toastify'
import { MdAddLink, MdVerified } from "react-icons/md";
import { BsLink } from "react-icons/bs";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";
import EditProfile from "@/app/(index)/(main)/user/[username]/@profile/components/client/EditProfile";
import Loading from "@/app/(index)/(main)/user/[username]/@profile/components/server/Loading";
import { UserContext, UserContextType } from "@/context/UserContext";

const Profile = ({ params }: { params: { username: string } }) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const userContext = React.useContext<UserContextType | undefined>(UserContext)

    const accessToken = authContext?.accessToken
    const user = authContext?.user
    const profile = authContext?.profile
    const setProfile: React.Dispatch<React.SetStateAction<ProfileType | null>> | undefined = authContext?.setProfile

    const parentLoading = userContext?.parentLoading
    const setParentLoading = userContext?.setParentLoading
    const isError = userContext?.isError
    const setIsError = userContext?.setIsError

    const [errorMsg, setErrorMsg] = React.useState<string>('')

    React.useEffect(() => {
        const handler = async () => {
            profile && profile.username === params.username ? setParentLoading?.(false) : null
            await FetchProfileData(params, accessToken, setProfile, setIsError, setErrorMsg, setParentLoading, user);
        }
        handler();
    }, [])

    return (
        parentLoading ? <Loading /> : <ProfileCard params={params} error={isError} errorMsg={errorMsg} />
    )
}

const ProfileCard = ({ params, error, errorMsg }: { params: { username: string }, error: boolean | undefined, errorMsg: string }) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)

    const accessToken = authContext?.accessToken
    const profile = authContext?.profile
    const setProfile = authContext?.setProfile

    return error ? <div className='py-4'>
        {errorMsg}
    </div> : <Card className="h-[457.66px] rounded-lg shadow-none divide-y">
        <CardHeader className='h-[297.66px] p-0 rounded-t-lg'>
            <Image src={profile?.banner ? profile?.banner : '/image/profile-banner.png'} width={1334} height={297.66}
                priority={true} alt='...' className='rounded-t-lg' placeholder='blur'
                blurDataURL="/image/profile-banner.png" style={{ width: "100%", height: "297.66px" }} />
        </CardHeader>
        <CardContent className="h-[160px] relative px-4 py-5 flex items-center justify-start gap-8">
            <Image src={profile?.image ? profile?.image : '/image/user.png'} width={120} height={120}
                className='rounded-lg w-[120px] h-[120px] overflow-hidden' alt='...' />
            <div className='space-y-2 max-w-4xl w-full'>
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
                <div className='text-sm truncate'>
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
                <div className='flex items-center gap-4 text-sm'>
                    <div className='flex items-center justify-center gap-1 cursor-pointer'>
                        <span>{profile?.posts}</span>
                        <span>Posts</span>
                    </div>
                    <div className='flex items-center justify-center gap-1 cursor-pointer'>
                        <span>{profile?.followers}</span>
                        <span>Followers</span>
                    </div>
                    <div className='flex items-center justify-center gap-1 cursor-pointer'>
                        <span>{profile?.following}</span>
                        <span>Followings</span>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-5 right-4 flex items-center justify-end gap-4'>
                {
                    profile?.self ? <EditProfile /> :
                        profile?.isFriend ?
                            <Button className='gap-[0.5rem]'
                                onClick={async () => await DisconnectPeople(accessToken, params.username, setProfile)}>
                                <BsLink />
                                <span>
                                    Disconnect
                                </span>
                            </Button> : <Button className='gap-[0.5rem]'
                                onClick={async () => await ConnectPeople(accessToken, params.username, setProfile)}>
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

const FetchProfileData = async (
    params: { username: string },
    accessToken: AccessToken | undefined,
    setProfile: React.Dispatch<React.SetStateAction<ProfileType | null>> | undefined,
    setIsError: React.Dispatch<React.SetStateAction<boolean>> | undefined,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    setParentLoading: React.Dispatch<React.SetStateAction<boolean>> | undefined,
    user: UserType | null | undefined
) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
        url: `${process.env.BASE_API_URL}/auth/users/${!user || user.username === params.username ? `me` : `user/${params.username}`}/`,
        method: 'GET',
    }

    await axios.request(options).then(response => {
        setProfile?.(response.data)
    }).catch(error => {
        setIsError?.(() => true)
        setErrorMsg(error.response.data.error ?? "There is some issue")
    }).finally(() => setParentLoading?.(() => false))
}

const ConnectPeople = async (accessToken: AccessToken | undefined, username: string, setProfile: ((value: (((prevState: (ProfileType | null)) => (ProfileType | null)) | ProfileType | null)) => void) | undefined) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
        url: `${process.env.BASE_API_URL}/auth/connect/${username}/`,
        method: 'POST',
    }

    await axios.request(options).then(() => {
        setProfile?.((pre) => {
            if (pre) {
                return {
                    ...pre,
                    isFriend: true,
                    followers: pre.followers + 1
                }
            } else {
                return null
            }
        });
        toast.success("Connected")
    })
}

const DisconnectPeople = async (accessToken: AccessToken | undefined, username: string, setProfile: ((value: (((prevState: (ProfileType | null)) => (ProfileType | null)) | ProfileType | null)) => void) | undefined) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        },
        url: `${process.env.BASE_API_URL}/auth/connect/${username}/`,
        method: 'DELETE',
    }

    await axios.request(options).then(() => {
        setProfile?.((pre) => {
            if (pre) {
                return {
                    ...pre,
                    isFriend: false,
                    followers: pre.followers - 1
                }
            } else {
                return null
            }
        });
        toast.success("Disconnected")
    })
}

export default Profile