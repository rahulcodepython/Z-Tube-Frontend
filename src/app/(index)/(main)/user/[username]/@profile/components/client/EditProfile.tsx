"use client"
import React from 'react'
import { AccessToken, AuthContext, AuthContextType, ProfileType, UserType } from '@/context/AuthContext';
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
import { FiEdit } from "react-icons/fi";
import { BiCamera, BiSend } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AiOutlineClose } from "react-icons/ai";

interface ValuesType {
    first_name: string
    last_name: string
    username: string
    bio: string
    isLocked: boolean
    tags: Array<string>
}

const EditProfile = ({ username }: { username: string }) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)

    const accessToken = authContext?.accessToken
    const profile = authContext?.profile
    const setProfile = authContext?.setProfile
    const setUser = authContext?.setUser


    const router = useRouter();
    const search = useSearchParams();

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false)
    const [bannerImage, setBannerImage] = React.useState<ImageListType>(
        profile ? profile.banner.length > 0 ? [{ data_url: profile.banner }] : [] : [])
    const [isBannerImageChange, setIsBannerImageChange] = React.useState<boolean>(false)
    const [userImage, setUserImage] = React.useState<ImageListType>(
        profile ? profile.image.length > 0 ? [{ data_url: profile.image }] : [] : [])
    const [isUserImageChange, setIsUserImageChange] = React.useState<boolean>(false)
    const [isUsernameValid, setIsUsernameValid] = React.useState<boolean>(true)

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
                    onSubmit={async values => await UpdateProfile(accessToken, isUserImageChange, isBannerImageChange, userImage, bannerImage, setProfile, setUser, setIsUpdating, setIsOpen, username, router, search.get('tabs'), values)}>
                    {({ values, handleChange, handleSubmit }) => {
                        return <Form onSubmit={(e) => {
                            e.preventDefault()
                        }} onKeyDown={(e) => {
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
                                        <ImageUploader image={bannerImage} setImage={setBannerImage}
                                            setIsImageChange={setIsBannerImageChange} mode="banner" />
                                    </div>
                                    <div className='col-span-2 flex flex-col justify-center gap-2'>
                                        <Label className="block uppercase text-xs font-bold" htmlFor="user">
                                            User Image
                                        </Label>
                                        <ImageUploader image={userImage} setImage={setUserImage}
                                            setIsImageChange={setIsUserImageChange} mode="dp" />
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="first_name">
                                                First Name
                                            </Label>
                                            <Input type="text" name="first_name" id='first_name'
                                                value={values.first_name} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="last_name">
                                                Last Name
                                            </Label>
                                            <Input type="text" name="last_name" id="last_name" value={values.last_name}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
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
                                    </div>
                                    <div className="col-span-1">
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
                                    <div className="col-span-2">
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="block uppercase text-xs font-bold" htmlFor="bio">
                                                About me
                                            </Label>
                                            <Textarea placeholder="Type your bio here." rows={5} name="bio" id="bio"
                                                value={values.bio} onChange={handleChange} />
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
                                                        return <TagsInput max={5} remove={remove} push={push}
                                                            tags={values.tags} />
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
                                    <Button type='submit' onClick={() => handleSubmit} className="gap-2">
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
    username: string,
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
            url: `${process.env.BASE_API_URL}/auth/profile/${username}/`,
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

        toast.success('Profile updated successfully');

        router.push(`/user/${encodeURIComponent(response.data.user.username)}${search ? `?tabs=${search}` : ''}`);
    } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('An error occurred while updating the profile. Please try again.');
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
            {({ onImageUpdate, onImageRemove }) =>
                image.map((img, index) => (
                    <div key={index} className="relative flex justify-center items-center group">
                        <Image
                            src={img.data_url}
                            width={300}
                            height={300}
                            priority={false}
                            alt="user image"
                            className={`${mode === 'full'
                                ? 'w-full h-full rounded-lg'
                                : mode === 'dp'
                                    ? 'w-60 h-60 rounded-full'
                                    : mode === 'banner'
                                        ? 'w-full h-64 rounded-lg'
                                        : ''
                                }`}
                        />
                        <div
                            className={`bg-whitebg-opacity-0 absolute ${mode === 'full'
                                ? 'w-full h-full rounded-lg'
                                : mode === 'dp'
                                    ? 'w-60 h-60 rounded-full'
                                    : mode === 'banner'
                                        ? 'w-full h-64 rounded-lg'
                                        : ''
                                } text-2xl flex gap-4 items-center justify-center group-hover:bg-opacity-50 group-hover:bg-white/20 transition-all duration-300 ease-in-out`}
                        >
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
                ))
            }
        </ImageUploading>
    );
};

export default EditProfile