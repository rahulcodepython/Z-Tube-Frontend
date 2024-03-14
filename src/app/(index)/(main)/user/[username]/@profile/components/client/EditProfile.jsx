"use client"
import React from 'react'
import { AiOutlineClose, BiSend, FaCircleCheck, FiEdit } from '@/data/icons/icons'
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Form, Formik } from 'formik';
import ImageUploader from '../server/ImageUploader';
import { Encrypt, UploadMediaFiles } from '@/utils';
import axios from "axios";
import {toast} from "react-toastify";

const EditProfile = ({ setProfile, username }) => {
    const { accessToken, profileData, setProfileData, setUserData } = React.useContext(AuthContext)

    const router = useRouter();

    const [isOpen, setIsOpen] = React.useState(false);
    const [isUpdating, setIsUpdating] = React.useState(false)
    const [userTagsInput, setUserTagsInput] = React.useState('')
    const [userTags, setUserTags] = React.useState(profileData.tags)
    const [formData, setFormData] = React.useState({})
    const [isLocked, setIsLocked] = React.useState(profileData?.isLocked)
    const [bannerImage, setbannerImage] = React.useState(
        profileData.banner.length > 0 ? [{ data_url: profileData.banner }] : [])
    const [isBannerImageChange, setIsBannerImageChange] = React.useState(false)
    const [userImage, setUserImage] = React.useState(
        profileData.image.length > 0 ? [{ data_url: profileData.image }] : [])
    const [isUserImageChange, setIsUserImageChange] = React.useState(false)
    const [isUsernameValid, setIsUsernameValid] = React.useState(true)

    const onModalClose = () => CloseModal(setIsOpen, setFormData, setUserImage, profileData, setbannerImage, setUserTagsInput, setUserTags)

    React.useEffect(() => {
        !isOpen ? onModalClose() : null
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className={'gap-[0.5rem]'}>
                    <FiEdit />
                    <span>
                        Edit Profile
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl">
                <DialogHeader>
                    <DialogTitle>My account</DialogTitle>
                </DialogHeader>
                <Formik initialValues={{
                    first_name: profileData.first_name || '',
                    last_name: profileData.last_name || '',
                    username: profileData.username || '',
                    bio: profileData.bio || '',
                }} onSubmit={async () => await UpdateProfile(accessToken, isUserImageChange, isBannerImageChange, userImage, bannerImage, formData, setProfileData, setUserData, setProfile, onModalClose, setIsUpdating, username, router)}>
                    {({ values, handleChange, handleSubmit }) => {
                        return <Form onSubmit={(e) => { e.preventDefault() }} onKeyDown={(e) => {
                            e.key === 'Enter' ? e.preventDefault() : null;
                        }} className="flex flex-col divide-y-2 gap-4 first:divide-y-0 px-4 lg:px-10 py-10">
                            <div className='flex flex-col justify-start gap-8 pt-4 first:pt-0'>
                                <h6 className=" text-sm font-bold uppercase">
                                    Basic Information
                                </h6>
                                <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-[50vh]">
                                    <div className='col-span-2 flex flex-col justify-center gap-2'>
                                        <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                            Banner Image
                                        </label>
                                        <ImageUploader image={bannerImage} setImage={setbannerImage} setIsImageChange={setIsBannerImageChange} mode="banner" />
                                    </div>
                                    <div className='col-span-2 flex flex-col justify-center gap-2'>
                                        <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                            User Image
                                        </label>
                                        <ImageUploader image={userImage} setImage={setUserImage} setIsImageChange={setIsUserImageChange} mode="dp" />
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                First Name
                                            </label>
                                            <Input type="text" name="first_name" id='first_name' value={values.first_name} onChange={(e) => {
                                                handleChange(e)
                                                e.target.value === profileData?.first_name ? delete formData?.first_name
                                                    : setFormData({
                                                        ...formData,
                                                        first_name: e.target.value
                                                    })
                                            }}
                                                className="focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                Last Name
                                            </label>
                                            <Input type="text" name="last_name" id="last_name" value={values.last_name} onChange={(e) => {
                                                handleChange(e)
                                                e.target.value === profileData?.last_name ? delete formData?.last_name
                                                    : setFormData({
                                                        ...formData,
                                                        last_name: e.target.value
                                                    })
                                            }}
                                                className="focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                Username
                                            </label>
                                            <div className='w-full flex gap-2 justify-center items-center'>
                                                <Input type="text" name="username" id="username" value={values.username} onChange={async (e) => {
                                                    handleChange(e)
                                                    await CheckUsername(e, profileData, setIsUsernameValid, formData, accessToken, setFormData)
                                                }}
                                                    className="focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                                <FaCircleCheck className={isUsernameValid ? 'text-green-500' : 'text-red-500'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                Lock Profile
                                            </label>
                                            <div className='flex gap-4 justify-center items-center text-sm'>
                                                <Checkbox id="isLocked" name="isLocked" checked={isLocked} onCheckedChange={(e) => {
                                                    setIsLocked(() => e)
                                                    e === profileData?.isLocked ? delete formData?.isLocked
                                                        : setFormData({
                                                            ...formData,
                                                            isLocked: e
                                                        })
                                                }} />
                                                <span>
                                                    {`${isLocked ? 'Locked' : 'Lock'}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                About me
                                            </label>
                                            <Textarea placeholder="Type your bio here." rows="5" name="bio" id="bio" value={values.bio} onChange={(e) => {
                                                handleChange(e)
                                                e.target.value === profileData?.bio ? delete formData?.bio
                                                    : setFormData({
                                                        ...formData,
                                                        bio: e.target.value
                                                    })
                                            }}
                                                className="focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                Tags
                                            </label>
                                            <Input type="text" className="focus:outline-none focus:ring-0 focus-visible:ring-0"
                                                value={userTagsInput}
                                                onChange={e => setUserTagsInput(() => e.target.value)}
                                                onKeyUp={e => e.key === 'Enter' ? AddTags(userTagsInput, userTags, profileData, formData, setFormData, setUserTags, setUserTagsInput) : null}
                                                disabled={userTags.length >= 5} />
                                            <div className='flex items-center gap-2 my-2'>
                                                {
                                                    userTags.map((tag, index) => (
                                                        <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full pl-4 pr-2 py-2 text-xs font-semibold text-black'>
                                                            #{tag}
                                                            <span className='cursor-pointer rounded-full p-1 bg-gray-300' onClick={() => RemoveTags(tag, userTags, setUserTags, formData, setFormData)}>
                                                                <AiOutlineClose />
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                isUpdating ? <Button disabled>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button> :
                                    <Button type='submit' onClick={handleSubmit}>
                                        <BiSend className='text-base' />
                                        <span>
                                            Update
                                        </span>
                                    </Button>
                            }
                        </Form>
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

const AddTags = (userTagsInput, userTags, profileData, formData, setFormData, setUserTags, setUserTagsInput) => {
    if (userTagsInput.trim().length > 0) {
        if (!userTags.includes(userTagsInput)) {
            JSON.stringify(profileData?.tags) === JSON.stringify([...userTags, userTagsInput]) ?
                delete formData.tags
                : setFormData({
                    ...formData,
                    tags: [...userTags, userTagsInput],
                })
            setUserTags(pre => [...pre, userTagsInput])
        }
    }
    setUserTagsInput(() => '')
}

const RemoveTags = (tag, userTags, setUserTags, formData, setFormData) => {
    if (userTags.filter(t => t !== tag).length > 0) {
        setFormData({
            ...formData,
            tags: JSON.stringify(userTags.filter(t => t !== tag)),
        })
    }
    else {
        delete formData.tags
    }
    setUserTags(pre => pre.filter(t => t !== tag))
}

const CheckUsername = async (e, profileData, setIsUsernameValid, formData, accessToken, setFormData) => {
    if (e.target.value === profileData?.username) {
        setIsUsernameValid(() => true)
        delete formData?.username
    }
    else {
        const options = {
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
            url: `${process.env.BASE_API_URL}/auth/find/username/`,
            method: 'POST',
            data: { "username": e.target.value },
        }

        await axios.request(options)
            .then(() => {
                setIsUsernameValid(() => true)
                setFormData({
                    ...formData,
                    username: e.target.value
                })
            })
            .catch(() => {
                setIsUsernameValid(() => false)
                delete formData?.username
            })
    }
}

const UpdateProfile = async (accessToken, isUserImageChange, isBannerImageChange, userImage, bannerImage, formData, setProfileData, setUserData, setProfile, onModalClose, setIsUpdating, username, router) => {
    setIsUpdating(() => true)

    const HandleTostify = new Promise(async (resolve, rejected) => {
        const userImageData = isUserImageChange ? {
            image: await UploadMediaFiles(userImage[0].file, `User/DP/${userImage[0].file.name}`)
        } : null
        const bannerImageData = isBannerImageChange ? {
            banner: await UploadMediaFiles(bannerImage[0].file, `User/Banner/${bannerImage[0].file.name}`)
        } : null

        const options = {
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
            url: `${process.env.BASE_API_URL}/auth/profile/${username}/`,
            method: 'PATCH',
            data: {
                ...formData,
                ...userImageData,
                ...bannerImageData
            },
        }

        await axios.request(options)
            .then(async response => {
                setProfileData(() => response.data.profile)
                setUserData(() => response.data.user)
                setProfile(() => response.data.profile)
                sessionStorage.removeItem("user")
                sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data.user), process.env.ENCRYPTION_KEY));
                resolve();
                router.push(`/user/${encodeURIComponent(response.data.user.username)}`)
            })
            .catch(() => {
                rejected();
            })
            .finally(() => {
                onModalClose()
                setIsUpdating(() => false)
            });
    });

    toast.promise(
        HandleTostify,
        {
            pending: 'Your request is on process.',
            success: 'You are now updated.',
            error: 'There is some issue, Try again.'
        }
    )
}

const CloseModal = (setIsOpen, setFormData, setUserImage, profileData, setbannerImage, setUserTagsInput, setUserTags) => {
    setIsOpen(() => false)
    setFormData({})
    setUserImage(() => profileData.image ? [{ data_url: profileData.image }] : [])
    setbannerImage(() => profileData.banner ? [{ data_url: profileData.banner }] : [])
    setUserTagsInput(() => '')
    setUserTags(() => profileData.tags)
}

export default EditProfile