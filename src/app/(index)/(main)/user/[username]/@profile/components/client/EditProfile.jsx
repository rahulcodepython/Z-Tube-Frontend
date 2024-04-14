"use client"
import React from 'react'
import { AiOutlineClose, BiSend, FaCircleCheck, FiEdit, BiCamera } from '@/data/icons/icons'
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
import { useRouter, useSearchParams } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Form, Formik, FieldArray } from 'formik';
import { UploadMediaFiles } from '@/utils';
import axios from "axios";
import { toast } from "react-toastify";
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import TagsInput from "@/components/TagsInput";
import { Label } from "@/components/ui/label";
import { DataContext } from '@/context/DataContext';

const EditProfile = ({ profileData, username }) => {
    const { accessToken, setUserData } = React.useContext(AuthContext)
    const { setData } = React.useContext(DataContext)

    const router = useRouter();
    const search = useSearchParams();

    const [isOpen, setIsOpen] = React.useState(false);
    const [isUpdating, setIsUpdating] = React.useState(false)
    const [bannerImage, setBannerImage] = React.useState(
        profileData.banner.length > 0 ? [{ data_url: profileData.banner }] : [])
    const [isBannerImageChange, setIsBannerImageChange] = React.useState(false)
    const [userImage, setUserImage] = React.useState(
        profileData.image.length > 0 ? [{ data_url: profileData.image }] : [])
    const [isUserImageChange, setIsUserImageChange] = React.useState(false)
    const [isUsernameValid, setIsUsernameValid] = React.useState(true)

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
                    isLocked: profileData?.isLocked,
                    tags: profileData?.tags,
                }} onSubmit={async values => await UpdateProfile(accessToken, isUserImageChange, isBannerImageChange, userImage, bannerImage, setData, setUserData, setIsUpdating, setIsOpen, username, router, search.get('tabs'), values)}>
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
                                        <Label className="block uppercase text-xs font-bold" htmlFor="banner">
                                            Banner Image
                                        </Label>
                                        <ImageUploader image={bannerImage} setImage={setBannerImage} setIsImageChange={setIsBannerImageChange} mode="banner" />
                                    </div>
                                    <div className='col-span-2 flex flex-col justify-center gap-2'>
                                        <Label className="block uppercase text-xs font-bold" htmlFor="user">
                                            User Image
                                        </Label>
                                        <ImageUploader image={userImage} setImage={setUserImage} setIsImageChange={setIsUserImageChange} mode="dp" />
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="first_name">
                                                First Name
                                            </Label>
                                            <Input type="text" name="first_name" id='first_name' value={values.first_name} onChange={handleChange} className="focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="last_name">
                                                Last Name
                                            </Label>
                                            <Input type="text" name="last_name" id="last_name" value={values.last_name} onChange={handleChange} className="focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="username">
                                                Username
                                            </Label>
                                            <div className='w-full flex gap-2 justify-center items-center'>
                                                <Input type="text" name="username" id="username" value={values.username} onChange={async (e) => {
                                                    handleChange(e)
                                                    await CheckUsername(e, profileData, setIsUsernameValid, accessToken)
                                                }} className="focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                                <FaCircleCheck className={isUsernameValid ? 'text-green-500' : 'text-red-500'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="isLocked">
                                                Lock Profile
                                            </Label>
                                            <div className='flex gap-4 justify-center items-center text-sm'>
                                                <Checkbox id="isLocked" name="isLocked" checked={values.isLocked} onCheckedChange={(e) => {
                                                    handleChange({
                                                        target: {
                                                            type: "checkbox",
                                                            checked: e,
                                                            name: 'isLocked'
                                                        }
                                                    })
                                                }} />
                                                <Label htmlFor="isLocked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {`${values.isLocked ? 'Locked' : 'Lock'}`}
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="bio">
                                                About me
                                            </Label>
                                            <Textarea placeholder="Type your bio here." rows="5" name="bio" id="bio" value={values.bio} onChange={handleChange} className="focus:outline-none focus:ring-0 focus-visible:ring-0" />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="tags">
                                                Tags
                                            </Label>
                                            <FieldArray name={'tags'}>
                                                {
                                                    ({ remove, push }) => {
                                                        return <TagsInput max={5} remove={remove} push={push} tags={values.tags} />
                                                    }
                                                }
                                            </FieldArray>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                isUpdating ? <Button disabled className="gap-2">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button> :
                                    <Button type='submit' onClick={handleSubmit} className="gap-2">
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

const CheckUsername = async (e, profileData, setIsUsernameValid, accessToken) => {
    if (e.target.value === profileData?.username) {
        setIsUsernameValid(() => true)
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
            .then(() => setIsUsernameValid(() => true))
            .catch(() => setIsUsernameValid(() => false))
    }
}

const UpdateProfile = async (accessToken, isUserImageChange, isBannerImageChange, userImage, bannerImage, setData, setUserData, setIsUpdating, setIsOpen, username, router, search, values) => {
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
                ...values,
                ...userImageData,
                ...bannerImageData
            },
        }

        await axios.request(options)
            .then(async response => {
                setUserData(() => response.data.user)
                setData(pre => {
                    let newData = { ...pre };
                    delete newData.profile[decodeURIComponent(username)];
                    newData.profile[decodeURIComponent(response.data.user.username)] = response.data.profile;
                    return newData;
                })
                resolve();
                router.push(`/user/${encodeURIComponent(response.data.user.username)}${search === null ? '' : `?tabs=${search}`}`)
            })
            .catch(() => {
                rejected();
            })
            .finally(() => {
                setIsOpen(() => false)
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

const ImageUploader = ({ image, setImage, setIsImageChange, mode }) => {
    return (
        <ImageUploading value={image} onChange={imageList => {
            setIsImageChange(() => true)
            setImage(pre => imageList)
        }} dataURLKey="data_url">
            {({
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                dragProps,
            }) => {
                return image.length > 0 ?
                    image.map((image, index) => {
                        return <div className='relative flex justify-center items-center group' key={index}>
                            <Image src={image.data_url} width={300} height={300} priority={false} alt='user image' className={`${mode === 'full' ? 'w-full h-full rounded-lg' : mode === 'dp' ? 'w-60 h-60 rounded-full' : mode === 'banner' ? 'w-full h-64 rounded-lg' : ''}`} />
                            <div className={`bg-whitebg-opacity-0 absolute ${mode === 'full' ? 'w-full h-full rounded-lg' : mode === 'dp' ? 'w-60 h-60 rounded-full' : mode === 'banner' ? 'w-full h-64 rounded-lg' : ''} text-2xl flex gap-4 items-center justify-center group-hover:bg-opacity-50 group-hover:bg-white/20 transition-all duration-300 ease-in-out`}>
                                <BiCamera onClick={() => onImageUpdate(index)} className='cursor-pointer opacity-0 group-hover:opacity-100 bg-background p-2 rounded-full text-4xl' />
                                <AiOutlineClose onClick={() => {
                                    setIsImageChange(pre => false)
                                    onImageRemove(index)
                                }} className='cursor-pointer opacity-0 group-hover:opacity-100 bg-background p-2 rounded-full text-4xl' />
                            </div>
                        </div>
                    }) : <section onClick={onImageUpload} {...dragProps} className='border-dashed border-2 p-8 flex justify-center items-center w-full h-60'>
                        <div className='flex flex-col items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className='text-gray-600'>Drag {`'n'`} drop some files here, or click to select files</p>
                        </div>
                    </section>
            }
            }
        </ImageUploading>
    )
}

export default EditProfile