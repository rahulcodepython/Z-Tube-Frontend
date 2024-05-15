"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { AccessToken, AuthContext, AuthContextType, ProfileType } from '@/context/AuthContext';
import { ReloadIcon } from "@radix-ui/react-icons"
import { DateTimeParser, UploadMediaFiles } from '@/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, Formik, FieldArray, FormikValues } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import Image from 'next/image'
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import TagsInput from "@/components/TagsInput";
import { BiCamera, BiSend } from "react-icons/bi";
import { FiEdit, FiTrash } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const CreateFeed = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken
    const setProfile = authContext?.setProfile

    const [uploading, setUploading] = React.useState<boolean>(false)
    const [media, setMedia] = React.useState<ImageListType>([])

    return <Formik initialValues={{
        caption: '',
        visibility: 'public',
        tags: [],
        allowComments: false
    }}
        onSubmit={async (values, actions) => {
            await CreateFeedPost(setUploading, accessToken, media, values, setProfile, setMedia)
            actions.resetForm()
        }}>
        {({ values, handleChange, handleSubmit }) => {
            return <Form onKeyDown={e => {
                e.key === 'Enter' ? e.preventDefault() : null;
            }}
                onSubmit={e => e.preventDefault()}
                className='flex flex-col gap-4'>
                <h6 className="text-gray-400 text-lg font-bold uppercase">
                    Post Details
                </h6>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 grid w-full gap-2 px-1">
                        <Label htmlFor="caption" className="uppercase text-gray-600 text-xs">Caption</Label>
                        <Textarea placeholder="Type your caption." rows={7} name="caption" value={values.caption}
                            onChange={handleChange} autoFocus
                            autoComplete="email" required />
                    </div>
                    <div className="col-span-2 grid w-full gap-2 px-1">
                        <Label htmlFor="visibility" className="uppercase text-gray-600 text-xs">Visibility</Label>
                        <Select onValueChange={(e) => {
                            let value = { target: { type: "select", value: e, name: 'visibility' } }
                            handleChange(value)
                        }}
                            defaultValue={values.visibility}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a visibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Visibility</SelectLabel>
                                    <SelectItem value="public">Everyone</SelectItem>
                                    <SelectItem value="protected">Connections</SelectItem>
                                    <SelectItem value="private">Only Me</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="col-span-2 w-full flex justify-center gap-1 px-1 space-x-2">
                        <Checkbox id="allowComments" checked={values.allowComments} name={'allowComments'}
                            onCheckedChange={e => handleChange({
                                target: {
                                    type: "checkbox",
                                    checked: e,
                                    name: 'allowComments'
                                }
                            })} />
                        <Label htmlFor="allowComments"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Allow Comments
                        </Label>
                    </div>
                    <div className="col-span-2 w-full flex flex-col gap-2 px-1">
                        <Label htmlFor="tags" className="uppercase text-gray-600 text-xs">Tags</Label>
                        <FieldArray name={'tags'}>
                            {
                                ({ remove, push }) => {
                                    return <TagsInput max={3} remove={remove} push={push} tags={values.tags} />
                                }
                            }
                        </FieldArray>
                    </div>
                    <div className="col-span-2 grid w-full gap-2 px-1">
                        <Label htmlFor="Media" className="uppercase text-gray-600 text-xs">Media</Label>
                        <MediaUploader media={media} setMedia={setMedia} setIsMediaUpdate={undefined} maxNumber={10} />
                    </div>
                </div>
                {
                    uploading ? <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                        : <Button type='submit' className={'gap-2'}
                            onClick={() => handleSubmit()}>
                            <BiSend className='text-base' />
                            <span>
                                Upload
                            </span>
                        </Button>
                }
            </Form>
        }}
    </Formik>
};

const CreateFeedPost = async (
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
    accessToken: AccessToken | undefined,
    media: ImageListType,
    values: FormikValues,
    setProfile: ((value: (((prevState: (ProfileType | null)) => (ProfileType | null)) | ProfileType | null)) => void) | undefined,
    setMedia: (value: (((prevState: Array<ImageType>) => Array<ImageType>) | Array<ImageType>)) => void
) => {
    if (media.length > 0) {
        setUploading(() => true)

        try {
            let mediaURL: Array<string> = [];

            await Promise.all(media.map(async (item: any) => {
                const url = await UploadMediaFiles(item.file, `Feed/${item.file.name}`);
                mediaURL.push(url);
            }));


            const options = {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                },
                url: `${process.env.BASE_API_URL}/feed/createpost/`,
                method: 'POST',
                data: {
                    ...values,
                    ...{
                        media: mediaURL,
                        createdAt: DateTimeParser(Date.now())
                    }
                }
            }

            const response = await axios.request(options)

            setProfile?.(pre => {
                if (pre) {
                    let newData = { ...pre };
                    newData.posts = response.data.posts;
                    setMedia([])
                    return newData;
                } else {
                    return null
                }
            })

            toast.success("Your feed is created.")
        } catch (error) {
            toast.error("The feed is not created.")
        }
        setUploading(() => false);

    } else {
        toast.warn("You can not upload without any media file.")
    }
}

interface MediaUploaderProps {
    media: ImageListType
    setMedia: React.Dispatch<React.SetStateAction<ImageListType>>
    setIsMediaUpdate: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    maxNumber: number
}

export const MediaUploader = ({ media, setMedia, setIsMediaUpdate, maxNumber }: MediaUploaderProps) => {
    return <ImageUploading value={media} multiple onChange={(imageList, addUpdateIndex) => {
        setIsMediaUpdate?.(() => true)
        setMedia(() => imageList)
    }} maxNumber={maxNumber} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => {
            return <div className={'space-y-2'}>
                {
                    imageList.length > 0 ? <div className={'flex justify-center items-center gap-2'} {...dragProps}>
                        <Button className={'gap-2'} onClick={onImageUpload}>
                            <FiEdit />
                            Edit
                        </Button>
                        <Button className={'gap-2'} onClick={onImageRemoveAll}>
                            <FiTrash />
                            Trash
                        </Button>
                    </div> : null
                }
                {
                    imageList.length === 0 ? <div className='border-dashed border-2 p-8 flex justify-center items-center w-full h-60'
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload} {...dragProps}>
                        <div className='flex flex-col items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className='text-gray-600'>Drag {`'n'`} drop some files here, or click to select
                                files</p>
                        </div>
                    </div> : imageList.length > 1 ? <Carousel>
                        <CarouselContent>
                            {
                                imageList.map((image, index) => {
                                    return <CarouselItem key={index}>
                                        <AspectRatio ratio={16 / 9}
                                            className={'flex items-center justify-center relative group'}>
                                            <Image src={image.data_url} width={250} height={250} alt="Image"
                                                className='object-cover' />
                                            <div
                                                className={'absolute text-2xl hidden group-hover:flex gap-4 items-center justify-center transition-all duration-300 ease-in-out'}>
                                                <Button variant="outline" size="icon" className={'rounded-full'}
                                                    onClick={() => onImageUpdate(index)}>
                                                    <BiCamera className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="icon" className={'rounded-full'}
                                                    onClick={() => onImageRemove(index)}>
                                                    <AiOutlineClose className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </AspectRatio>
                                    </CarouselItem>
                                })
                            }
                        </CarouselContent>
                        <CarouselPrevious className={'ml-20'} />
                        <CarouselNext className={'mr-20'} />
                    </Carousel> : <AspectRatio ratio={16 / 9} className={'flex items-center justify-center'}>
                        <Image src={imageList[0].data_url} width={250} height={250} alt="Image"
                            className='object-cover' />
                    </AspectRatio>
                }
            </div>
        }}
    </ImageUploading>
}

export default CreateFeed