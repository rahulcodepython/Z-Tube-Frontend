"use client"
import React from 'react';
import { AiOutlineClose, BiSend } from '@/data/icons/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AuthContext } from '@/context/AuthContext';
import { ReloadIcon } from "@radix-ui/react-icons"
import { UploadMediaFiles } from '@/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, Formik } from "formik";
import MediaUploader from "@/app/(index)/(main)/components/client/MediaUploader";
import { Checkbox } from "@/components/ui/checkbox"

const EditFeed = ({ setIsOpen, post, setPost }) => {
    const { accessToken } = React.useContext(AuthContext)

    const [uploading, setUploading] = React.useState(false)
    const [tagsInput, setTagsInput] = React.useState('')
    const [tags, setTags] = React.useState(post.tags)
    const [isMediaUpdate, setIsMediaUpdate] = React.useState(false)
    const [isAllowComments, setIsAllowComments] = React.useState(post.allowComments)
    const [media, setMedia] = React.useState(
        post.media.map(item => {
            return {
                data_url: item
            }
        })
    )

    return (
        <Formik initialValues={{
            caption: post.caption,
            visibility: post.isPublic ? 'public' : post.isProtected ? 'protected' : post.isPrivate ? 'private' : null,
        }} onSubmit={
            async values => await CreateFeedPost(setUploading, accessToken, media, values, isAllowComments, tags, setIsOpen, post, setPost, isMediaUpdate)
        }>
            {({ values, handleChange, handleSubmit }) => (
                <Form onKeyDown={e => {
                    e.key === 'Enter' ? e.preventDefault() : null;
                }}
                    onSubmit={e => e.preventDefault()}
                    className='pt-8 flex flex-col gap-4'>

                    <h6 className="text-gray-400 text-lg font-bold uppercase">
                        Post Details
                    </h6>
                    <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[50vh]">
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="caption" className="uppercase text-gray-600 text-xs">Caption</Label>
                            <Textarea placeholder="Type your caption." rows="7" name="caption" value={values.caption}
                                onChange={handleChange} className="focus:ring-0 focus-visible:ring-0" autoFocus
                                autoComplete="email" required />
                        </div>
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="visibility" className="uppercase text-gray-600 text-xs">Visibility</Label>
                            <Select onValueChange={(e) => handleChange(e)}
                                defaultValue={values.visibility}>
                                <SelectTrigger className="focus:ring-0 focus-visible:ring-0">
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
                            <Checkbox id="terms2" checked={isAllowComments} name={'allowComments'} onCheckedChange={e => setIsAllowComments(e)} />
                            <label htmlFor="terms2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Allow Comments
                            </label>
                        </div>
                        <div className="col-span-2 w-full flex flex-col gap-2 px-1">
                            <Label htmlFor="tags" className="uppercase text-gray-600 text-xs">Tags</Label>
                            <Input type="text" placeholder="Enter a tags"
                                className="focus:ring-0 focus-visible:ring-0"
                                disabled={tags.length >= 3} value={tagsInput}
                                onChange={e => setTagsInput(() => e.target.value)}
                                onKeyUp={e => e.key === 'Enter' ? AddTags(tagsInput, setTagsInput, tags, setTags) : null} />
                            {
                                tags.length > 0 ? <div className='flex items-center gap-2 my-2'>
                                    {
                                        tags.map((tag, index) => {
                                            return <div key={index}
                                                className='flex items-center justify-center gap-2 bg-gray-200 rounded-full pl-4 pr-2 py-1 text-xs font-semibold text-black'>
                                                #{tag}
                                                <span className='cursor-pointer rounded-full bg-gray-300 p-1'
                                                    onClick={() => RemoveTags(tag, setTags)}>
                                                    <AiOutlineClose />
                                                </span>
                                            </div>
                                        })
                                    }
                                </div> : null
                            }
                        </div>
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="Media" className="uppercase text-gray-600 text-xs">Media</Label>
                            <MediaUploader media={media} setMedia={setMedia} setIsMediaUpdate={setIsMediaUpdate} />
                        </div>
                    </div>
                    {
                        uploading ? <Button disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                            : <Button type='submit' className={'gap-2'}
                                onClick={handleSubmit}>
                                <BiSend className='text-base' />
                                <span>
                                    Upload
                                </span>
                            </Button>
                    }
                </Form>
            )}
        </Formik>
    );
};

const CreateFeedPost = async (setUploading, accessToken, media, values, isAllowComments, tags, setIsOpen, post, setPost, isMediaUpdate) => {
    if (media.length > 0) {
        setUploading(() => true)

        const HandleTostify = new Promise(async (resolve, rejected) => {
            let mediaURL = isMediaUpdate ? [] : post.media;

            isMediaUpdate ? await Promise.all(media.map(async (item) => {
                if (item.type.includes('image/')) {
                    const url = await UploadMediaFiles(item, `Feed/${item.name}`);
                    mediaURL.push(url);
                }
            })) : null;


            const options = {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                },
                url: `${process.env.BASE_API_URL}/feed/editpost/${post.id}/`,
                method: 'PATCH',
                data: {
                    ...values,
                    ...{
                        media: mediaURL,
                        tags: tags,
                        allowComments: isAllowComments
                    }
                }
            }

            await axios.request(options)
                .then((response) => {
                    setPost(() => response.data)
                    resolve();
                })
                .catch(() => {
                    rejected();
                })
                .finally(() => {
                    setIsOpen(() => false);
                    setUploading(() => false);
                })
        })

        toast.promise(
            HandleTostify,
            {
                pending: 'Your request is on process.',
                success: 'You post is uploaded.',
                error: 'There is some issue, Try again.'
            }
        )
    } else {
        toast.warn("You can not upload without any media file.")
    }
}

const AddTags = (tagsInput, setTagsInput, tags, setTags) => {
    if (tagsInput.trim().length > 0) {
        if (!tags.includes(tagsInput)) {
            setTags(pre => [...pre, tagsInput])
        }
    }
    setTagsInput(() => '')
}

const RemoveTags = (tag, setTags) => {
    setTags(pre => pre.filter(t => t !== tag))
}

export default EditFeed