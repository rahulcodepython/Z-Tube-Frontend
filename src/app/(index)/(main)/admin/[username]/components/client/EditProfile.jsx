"use client"
import React from 'react'
import { AiOutlineClose, BiSend, FaCircleCheck, FiEdit } from '@/data/icons/icons'
import { Context } from '@/context/Context';
import ImageUploader from '@/app/(index)/(main)/admin/[username]/components/server/ImageUploader';
import { AddTagsEditProfile, CheckUser, OnModalCloseEditProfile, RemoveTagsEditProfile, UpdateProfile } from '@/utils/index';
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

const EditProfile = ({ setProfile }) => {
    const { isAuthenticated, isAccessToken, accessToken, profileData, setProfileData, setIsProfileData, setIsUserData, setUserData } = React.useContext(Context)

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

    const onModalClose = () => OnModalCloseEditProfile(setIsOpen, setFormData, setUserImage, profileData, setbannerImage, setUserTagsInput, setUserTags)

    React.useEffect(() => {
        !isOpen ? onModalClose() : null
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
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
                }}>
                    {({ values, handleChange }) => {
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
                                                    await CheckUser(e, profileData, setIsUsernameValid, formData, accessToken, setFormData)
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
                                                    setIsLocked(pre => e)
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
                                                onChange={e => setUserTagsInput(pre => e.target.value)}
                                                onKeyUp={e => e.key === 'Enter' ? AddTagsEditProfile(userTagsInput, userTags, profileData, formData, setFormData, setUserTags, setUserTagsInput) : null}
                                                disabled={userTags.length >= 5 ? true : false} />
                                            <div className='flex items-center gap-2 my-2'>
                                                {
                                                    userTags.map((tag, index) => (
                                                        <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full pl-4 pr-2 py-2 text-xs font-semibold text-black'>
                                                            #{tag}
                                                            <span className='cursor-pointer rounded-full p-1 bg-gray-300' onClick={() => RemoveTagsEditProfile(userTags, setUserTags, formData, setFormData)}>
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
                                    <Button type='submit' onClick={async () => await UpdateProfile(isAuthenticated, isAccessToken, accessToken, isUserImageChange, isBannerImageChange, userImage, bannerImage, formData, setIsProfileData, setProfileData, setIsUserData, setUserData, setProfile, router, onModalClose, setIsUpdating)}>
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

export default EditProfile