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
import { ImageListType, ImageType } from 'react-images-uploading';
import TagsInput from "@/components/TagsInput";
import { BiSend } from "react-icons/bi";
import FeedMediaUploader from '@/app/(index)/(main)/user/[username]/@feed/components/client/FeedMediaUploader';

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
                        <FeedMediaUploader media={media} setMedia={setMedia} setIsMediaUpdate={undefined} maxNumber={10} />
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

export default CreateFeed