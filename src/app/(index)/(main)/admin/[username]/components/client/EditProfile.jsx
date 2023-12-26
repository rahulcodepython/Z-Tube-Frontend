"use client"
import React from 'react'
import { AiOutlineClose, FaCircleCheck, FiEdit } from '@/data/icons/icons'
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { Context } from '@/context/Context';
import { toast } from 'react-toastify';
import { analytics } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ImageUploader from '@/app/(index)/(main)/components/server/ImageUploader';
import { Encrypt } from '@/functions/Encrypt';
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

const EditProfile = ({ setProfile }) => {
    const { isAuthenticated, isAccessToken, accessToken, profileData, setProfileData, setIsProfileData, setIsUserData, setUserData } = React.useContext(Context)

    const router = useRouter();

    const [isOpen, setIsOpen] = React.useState(false);
    const [userTagsInput, setUserTagsInput] = React.useState('')
    const [userTags, setUserTags] = React.useState(profileData.tags)
    const [formData, setFormData] = React.useState({})
    const [bannerImage, setbannerImage] = React.useState(
        profileData.banner.length > 0 ? [{ data_url: profileData.banner }] : [])
    const [isBannerImageChange, setIsBannerImageChange] = React.useState(false)
    const [userImage, setUserImage] = React.useState(
        profileData.image.length > 0 ? [{ data_url: profileData.image }] : [])
    const [isUserImageChange, setIsUserImageChange] = React.useState(false)
    const [isUsernameValid, setIsUsernameValid] = React.useState(true)

    const onModalClose = () => {
        setIsOpen(pre => false)
        setFormData({})
        setUserImage(pre => profileData.image ? [{ data_url: profileData.image }] : [])
        setbannerImage(pre => profileData.banner ? [{ data_url: profileData.banner }] : [])
        setUserTagsInput(pre => '')
        setUserTags(pre => profileData.tags)
    }

    const addTags = () => {
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
        setUserTagsInput(pre => '')
    }

    React.useEffect(() => {
        !isOpen ? onModalClose() : null
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className='px-4 py-2 flex items-center gap-2'>
                    <FiEdit />
                    <span>
                        Edit Profile
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl">
                <DialogHeader>
                    <DialogTitle>My account</DialogTitle>
                </DialogHeader>
                <Formik initialValues={{
                    first_name: profileData?.user?.first_name,
                    last_name: profileData?.user?.last_name,
                    username: profileData?.user?.username,
                    isLocked: profileData?.isLocked,
                    bio: profileData?.bio,
                }}
                    onSubmit={async () => {
                        if (isAuthenticated && isAccessToken) {

                            const option = {
                                headers: {
                                    Authorization: `JWT ${accessToken}`,
                                    "Content-Type": "application/json",
                                }
                            }

                            const HandleTostify = new Promise(async (resolve, rejected) => {
                                const uploadedUserImage = async () => {
                                    let url = {};
                                    if (isUserImageChange) {
                                        const fileref = ref(analytics, `User/DP/${userImage[0].file.name}`)
                                        await uploadBytes(fileref, userImage[0].file)
                                            .then(async response => {
                                                url = { image: await getDownloadURL(response.ref) }
                                            })
                                    }
                                    return url
                                }

                                const uploadedBannerImage = async () => {
                                    let url = {}
                                    if (isBannerImageChange) {
                                        const fileref = ref(analytics, `User/Banner/${bannerImage[0].file.name}`)
                                        await uploadBytes(fileref, bannerImage[0].file)
                                            .then(async response => {
                                                url = { banner: await getDownloadURL(response.ref) }
                                            })
                                    }
                                    return url;
                                }

                                axios.patch(`${process.env.BACKEND_DOMAIN_NAME}/auth/profile/`, {
                                    ...formData,
                                    ...uploadedUserImage,
                                    ...uploadedBannerImage
                                }, option)
                                    .then(async response => {
                                        setIsProfileData(pre => true)
                                        setProfileData(pre => response.data.profile)
                                        setIsUserData(pre => true)
                                        setUserData(pre => response.data.user)
                                        setProfile(pre => response.data.profile)
                                        sessionStorage.removeItem("user")
                                        sessionStorage.setItem("user", Encrypt(JSON.stringify(response.data.user), process.env.ENCRYPTION_KEY));
                                        resolve();
                                        onModalClose()
                                        router.push(`/admin/${encodeURIComponent(response.data.user.username)}`)
                                    })
                                    .catch((error) => {
                                        rejected();
                                        onModalClose()
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
                    }}>
                    {({ values, handleChange, handleSubmit }) => (
                        <Form onKeyDown={(e) => {
                            e.key === 'Enter' ? e.preventDefault() : null;
                        }} className="flex flex-col divide-y-2 gap-4 first:divide-y-0 px-4 lg:px-10 py-10 overflow-y-scroll h-[80vh]">
                            <div className='flex flex-col justify-start gap-8 pt-4 first:pt-0'>
                                <h6 className=" text-sm font-bold uppercase">
                                    Basic Information
                                </h6>
                                <div className="grid grid-cols-2 gap-4">
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
                                            <Field type="text" name="first_name" id={'first_name'} onChange={(e) => {
                                                handleChange(e)
                                                e.target.value === profileData?.user?.first_name ? delete formData?.first_name
                                                    : setFormData({
                                                        ...formData,
                                                        first_name: e.target.value
                                                    })
                                            }}
                                                className="border-0 p-3 rounded text-sm focus:outline-none focus:ring shadow w-full" />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                Last Name
                                            </label>
                                            <Field type="text" name="last_name" id="last_name" onChange={(e) => {
                                                handleChange(e)
                                                e.target.value === profileData?.user?.last_name ? delete formData?.last_name
                                                    : setFormData({
                                                        ...formData,
                                                        last_name: e.target.value
                                                    })
                                            }}
                                                className="border-0 p-3 rounded text-sm focus:outline-none focus:ring shadow w-full" />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                Username
                                            </label>
                                            <div className='w-full flex gap-2 justify-center items-center'>
                                                <Field type="text" name="username" id="username" onChange={async (e) => {
                                                    handleChange(e)
                                                    if (e.target.value === profileData?.user?.username) {
                                                        setIsUsernameValid(pre => true)
                                                        delete formData?.username
                                                    }
                                                    else {
                                                        const option = {
                                                            headers: {
                                                                Authorization: `JWT ${accessToken}`,
                                                                "Content-Type": "application/json",
                                                            }
                                                        }

                                                        await axios.post(`${process.env.BACKEND_DOMAIN_NAME}/auth/find/username/`, { "username": e.target.value }, option)
                                                            .then(response => {
                                                                setIsUsernameValid(pre => true)
                                                                setFormData({
                                                                    ...formData,
                                                                    username: e.target.value
                                                                })
                                                            })
                                                            .catch(error => {
                                                                setIsUsernameValid(pre => false)
                                                                delete formData?.username
                                                            })
                                                    }
                                                }}
                                                    className="border-0 p-3 rounded text-sm focus:outline-none focus:ring shadow w-full" />
                                                <FaCircleCheck className={isUsernameValid ? 'text-green-500' : 'text-red-500'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                Lock Profile
                                            </label>
                                            <div className='flex gap-4 justify-center items-center'>
                                                <Field type="checkbox" name="isLocked" id="isLocked" onChange={(e) => {
                                                    handleChange(e)
                                                    e.target.checked === profileData?.isLocked ? delete formData?.isLocked
                                                        : setFormData({
                                                            ...formData,
                                                            isLocked: e.target.checked
                                                        })
                                                }} />
                                                <span>
                                                    {`${values.isLocked ? 'Locked' : 'Lock'}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                About me
                                            </label>
                                            <Field type="text" name="bio" id="bio" onChange={(e) => {
                                                handleChange(e)
                                                e.target.value === profileData?.bio ? delete formData?.bio
                                                    : setFormData({
                                                        ...formData,
                                                        bio: e.target.value
                                                    })
                                            }}
                                                className="border-0 p-3 rounded text-sm focus:outline-none focus:ring shadow w-full" />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <label className="block uppercase text-xs font-bold" htmlFor="grid-password">
                                                Tags
                                            </label>
                                            <Input type="text" className={`border-0 p-3 rounded text-sm shadow focus:outline-none focus:ring ${userTags.length >= 5 ? 'focus:ring-gray-400' : ''} w-full`}
                                                value={userTagsInput}
                                                onChange={e => setUserTagsInput(pre => e.target.value)}
                                                onKeyUp={e => e.key === 'Enter' ? addTags() : null}
                                                disabled={userTags.length >= 5 ? true : false} />
                                            <div className='flex items-center gap-2 my-2'>
                                                {
                                                    userTags.map((tag, index) => (
                                                        <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full pl-4 pr-2 py-2 text-xs font-semibold text-black'>
                                                            #{tag}
                                                            <span className='cursor-pointer rounded-full p-1 bg-gray-300' onClick={() => {
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
                                                            }}>
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
                            <Button type='submit' onClick={handleSubmit} className="py-2">
                                Update
                            </Button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile