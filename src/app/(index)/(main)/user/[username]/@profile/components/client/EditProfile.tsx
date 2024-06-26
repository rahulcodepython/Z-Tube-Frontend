"use client"
import React from 'react'
import { AccessToken, AuthContext, AuthContextType, LogoutUserType, ProfileType, UserType } from '@/context/AuthContext';
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
import { Form, Formik, FieldArray, FormikValues } from 'formik';
import { UploadMediaFiles } from '@/utils';
import axios from "axios";
import { toast } from "react-toastify";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Image from 'next/image';
import TagsInput from "@/components/TagsInput";
import { Label } from "@/components/ui/label";
import { FiEdit, FiTrash } from "react-icons/fi";
import { BiCamera, BiSend } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AiOutlineClose } from "react-icons/ai";

const EditProfile = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)

    const accessToken = authContext?.accessToken
    const profile = authContext?.profile
    const setProfile = authContext?.setProfile
    const setUser = authContext?.setUser
    const LogoutUser = authContext?.LogoutUser

    const router = useRouter();
    const search = useSearchParams();

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false)
    const [bannerImage, setBannerImage] = React.useState<ImageListType>(
        profile ? profile.banner.length > 0 ? [{ data_url: profile.banner }] : [{ data_url: '/image/profile-banner.png' }] : [])
    const [isBannerImageChange, setIsBannerImageChange] = React.useState<boolean>(false)
    const [userImage, setUserImage] = React.useState<ImageListType>(
        profile ? profile.image.length > 0 ? [{ data_url: profile.image }] : [{ data_url: '/image/user.png' }] : [])
    const [isUserImageChange, setIsUserImageChange] = React.useState<boolean>(false)
    const [isUsernameValid, setIsUsernameValid] = React.useState<boolean>(true)
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false)

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
                    first_name: profile?.first_name ?? '',
                    last_name: profile?.last_name ?? '',
                    username: profile?.username ?? '',
                    bio: profile?.bio ?? '',
                    isLocked: profile?.isLocked,
                    tags: profile?.tags,
                }}
                    onSubmit={async values => {
                        await UpdateProfile(accessToken, isUserImageChange, isBannerImageChange, userImage, bannerImage, setProfile, setUser, setIsUpdating, setIsOpen, router, search.get('tabs'), values)
                    }}>
                    {({ values, handleChange, handleSubmit }) => {
                        return <Form onSubmit={(e) => {
                            e.preventDefault()
                        }} onKeyDown={(e) => {
                            e.key === 'Enter' ? e.preventDefault() : null;
                        }} className="flex flex-col gap-4 px-4 lg:px-10 py-10">
                            <div className='flex flex-col justify-start gap-8 pt-4 first:pt-0'>
                                <h6 className=" text-sm font-bold uppercase">
                                    Basic Information
                                </h6>
                                <div className="grid grid-cols-1 gap-8 overflow-y-scroll h-[50vh]">
                                    <div className='flex flex-col justify-center gap-2'>
                                        <Label className="block uppercase text-xs font-bold" htmlFor="banner">
                                            Banner Image
                                        </Label>
                                        <ImageUploader image={bannerImage} setImage={setBannerImage}
                                            setIsImageChange={setIsBannerImageChange} mode="banner" />
                                    </div>
                                    <div className='flex flex-col justify-center gap-2'>
                                        <Label className="block uppercase text-xs font-bold" htmlFor="user">
                                            User Image
                                        </Label>
                                        <ImageUploader image={userImage} setImage={setUserImage}
                                            setIsImageChange={setIsUserImageChange} mode="dp" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="first_name">
                                                First Name
                                            </Label>
                                            <Input type="text" name="first_name" id='first_name'
                                                value={values.first_name} onChange={handleChange} />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="last_name">
                                                Last Name
                                            </Label>
                                            <Input type="text" name="last_name" id="last_name" value={values.last_name}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="username">
                                                Username
                                            </Label>
                                            <div className='w-full flex gap-2 justify-center items-center'>
                                                <Input type="text" name="username" id="username" value={values.username}
                                                    onChange={async (e) => {
                                                        handleChange(e)
                                                        await CheckUsername(e.target.value, profile, setIsUsernameValid, accessToken)
                                                    }} />
                                                <FaCircleCheck
                                                    className={isUsernameValid ? 'text-green-500' : 'text-red-500'} />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="isLocked">
                                                Lock Profile
                                            </Label>
                                            <div className='flex gap-4 justify-center items-center text-sm'>
                                                <Checkbox id="isLocked" name="isLocked" checked={values.isLocked}
                                                    onCheckedChange={(e) => {
                                                        handleChange({
                                                            target: {
                                                                type: "checkbox",
                                                                checked: e,
                                                                name: 'isLocked'
                                                            }
                                                        })
                                                    }} />
                                                <Label htmlFor="isLocked"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {`${values.isLocked ? 'Locked' : 'Lock'}`}
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="block uppercase text-xs font-bold" htmlFor="bio">
                                            About me
                                        </Label>
                                        <Textarea placeholder="Type your bio here." rows={5} name="bio" id="bio"
                                            value={values.bio} onChange={handleChange} />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="block uppercase text-xs font-bold" htmlFor="tags">
                                            Tags
                                        </Label>
                                        <FieldArray name={'tags'}>
                                            {
                                                ({ remove, push }) => {
                                                    return <TagsInput max={5} remove={remove} push={push}
                                                        tags={values.tags} />
                                                }
                                            }
                                        </FieldArray>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between pt-4'>
                                {
                                    isDeleting ? <Button disabled className="gap-2">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button> : <Button className='gap-2' onClick={() => handleDelete(accessToken, router, LogoutUser, setIsDeleting)}>
                                        <FiTrash />
                                        Delete Account
                                    </Button>
                                }
                                {
                                    isUpdating ? <Button disabled className="gap-2">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button> :
                                        <Button type='submit' onClick={() => handleSubmit()} className="gap-2">
                                            <BiSend className='text-base' />
                                            <span>
                                                Update
                                            </span>
                                        </Button>
                                }
                            </div>
                        </Form>
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

const CheckUsername = async (e: string, profileData: ProfileType | null | undefined, setIsUsernameValid: React.Dispatch<React.SetStateAction<boolean>>, accessToken: AccessToken | undefined) => {
    if (e === profileData?.username) {
        setIsUsernameValid(() => true)
    } else {
        const options = {
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
            url: `${process.env.BASE_API_URL}/auth/find/username/`,
            method: 'POST',
            data: { "username": e },
        }

        await axios.request(options)
            .then(() => setIsUsernameValid(() => true))
            .catch(() => setIsUsernameValid(() => false))
    }
}

const UpdateProfile = async (
    accessToken: AccessToken | undefined,
    isUserImageChange: boolean,
    isBannerImageChange: boolean,
    userImage: ImageListType,
    bannerImage: ImageListType,
    setProfile: ((value: (((prevState: (ProfileType | null)) => (ProfileType | null)) | ProfileType | null)) => void) | undefined,
    setUserData: ((value: (((prevState: (UserType | null)) => (UserType | null)) | UserType | null)) => void) | undefined,
    setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    router: AppRouterInstance,
    search: string | null,
    values: FormikValues
) => {
    setIsUpdating(true);
    try {
        const userImageData: { image: string } | null = !isUserImageChange ? null : {
            image: await UploadMediaFiles(userImage[0]?.file, `User/DP/${userImage[0]?.file?.name}`)
        };

        const bannerImageData: { banner: string } | null = !isBannerImageChange ? null : {
            banner: await UploadMediaFiles(bannerImage[0]?.file, `User/Banner/${bannerImage[0]?.file?.name}`)
        };

        const options = {
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
            url: `${process.env.BASE_API_URL}/auth/users/me/`,
            method: 'PATCH',
            data: {
                ...values,
                ...userImageData,
                ...bannerImageData,
            },
        };

        const response = await axios.request(options);
        setUserData?.(response.data.user);
        setProfile?.(response.data.profile);

        toast.success('Profile update successfully');

        router.push(`/user/${encodeURIComponent(response.data.user.username)}${search ? `?tabs=${search}` : ''}`);
    } catch (error: any) {
        toast.error(error?.response?.data?.error ?? 'There is some issue. Please try again.');
    } finally {
        setIsOpen(false);
        setIsUpdating(false);
    }
};

interface ImageUploaderProps {
    image: ImageListType;
    setImage: React.Dispatch<React.SetStateAction<ImageListType>>;
    setIsImageChange: React.Dispatch<React.SetStateAction<boolean>>;
    mode: 'full' | 'dp' | 'banner';
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    image,
    setImage,
    setIsImageChange,
    mode,
}) => {
    const handleImageUpload = (imageList: ImageListType) => {
        setIsImageChange(true);
        setImage(imageList);
    };

    return (
        <ImageUploading value={image} onChange={handleImageUpload} dataURLKey="data_url">
            {({ onImageUpdate, onImageRemove, onImageUpload, dragProps }) =>
                image.length === 0 ? <div
                    className="flex items-center justify-center w-full h-40 border-2 border-border border-dashed rounded-lg cursor-pointer"
                    onClick={onImageUpload} {...dragProps}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and
                            drop</p>
                        <p className="text-xs">SVG, PNG, JPG or GIF</p>
                    </div>
                </div>
                    : image.map((img, index) => {
                        return <div key={index} className="relative flex justify-center items-center group">
                            <Image
                                src={img.data_url}
                                width={300}
                                height={300}
                                priority={false}
                                alt="user image"
                                className={`${mode === 'full'
                                    ? 'w-full h-full rounded-lg'
                                    : mode === 'dp'
                                        ? 'w-40 h-40 rounded-full'
                                        : mode === 'banner'
                                            ? 'w-full h-40 rounded-lg'
                                            : ''
                                    }`}
                            />
                            <div className={`bg-whitebg-opacity-0 absolute ${mode === 'full'
                                ? 'w-full h-full rounded-lg'
                                : mode === 'dp'
                                    ? 'w-40 h-40 rounded-full'
                                    : mode === 'banner'
                                        ? 'w-full h-40 rounded-lg'
                                        : ''
                                } text-2xl flex gap-4 items-center justify-center group-hover:bg-opacity-50 group-hover:bg-white/20 transition-all duration-300 ease-in-out`}>
                                <BiCamera
                                    onClick={() => onImageUpdate(index)}
                                    className="cursor-pointer opacity-0 group-hover:opacity-100 bg-background p-2 rounded-full text-4xl"
                                />
                                <AiOutlineClose
                                    onClick={() => {
                                        setIsImageChange(false);
                                        onImageRemove(index);
                                    }}
                                    className="cursor-pointer opacity-0 group-hover:opacity-100 bg-background p-2 rounded-full text-4xl"
                                />
                            </div>
                        </div>
                    })
            }
        </ImageUploading>
    );
};

const handleDelete = async (
    accessToken: AccessToken | undefined,
    router: any,
    LogoutUser: LogoutUserType | undefined,
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        const options = {
            method: 'DELETE',
            url: `${process.env.BASE_API_URL}/auth/users/me/`,
            headers: {
                Authorization: `JWT ${accessToken}`,
            }
        }
        await axios.request(options);
        toast.success("Your account is deleted.");
        await LogoutUser?.();
        router.push('/auth/register');
    } catch (error: any) {
        toast.error(error?.response?.data?.error ?? 'There is some issue. Please try again.');
    } finally {
        setIsDeleting(false);
    }
}

export default EditProfile