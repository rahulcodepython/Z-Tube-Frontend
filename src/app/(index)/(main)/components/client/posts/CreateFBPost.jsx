"use client"
import React from 'react';
import { Formik, Form } from 'formik';
import { AiOutlineClose } from '@/data/icons/icons';
import MediaUploader from '../../server/MediaUploader';
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
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { analytics } from '@/lib/firebase/config';
import axios from 'axios';
import { Context } from '@/context/Context';

const CreateFBPost = ({ setIsOpen }) => {
    const { accessToken } = React.useContext(Context)

    const [tagsInput, setTagsInput] = React.useState('')
    const [tags, setTags] = React.useState([])
    const [formData, setFormData] = React.useState({ visibility: "all" })
    const [media, setMedia] = React.useState([])

    const addTags = () => {
        if (tagsInput.trim().length > 0) {
            if (!tags.includes(tagsInput)) {
                setFormData({
                    ...formData,
                    tags: [...tags, tagsInput],
                })
                setTags(pre => [...pre, tagsInput])
            }
        }
        setTagsInput(pre => '')
    }

    const removeTags = (tag) => {
        setFormData({
            ...formData,
            tags: tags.filter(t => t !== tag),
        })
        setTags(pre => pre.filter(t => t !== tag))
    }

    const uploadMediaFiles = async (item) => {
        let url;
        const fileref = ref(analytics, `Feed/${item.name}`);
        const response = await uploadBytes(fileref, item);
        url = await getDownloadURL(response.ref);
        return url;
    };

    return (
        <Formik initialValues={{
            initialValues: {
                caption: '',
            }
        }}
            onSubmit={() => {
                if (media.length > 0) {
                    const option = {
                        headers: {
                            Authorization: `JWT ${accessToken}`,
                            "Content-Type": "application/json",
                        }
                    }

                    const HandleTostify = new Promise(async (resolve, rejected) => {
                        let mediaURL = [];
                        await Promise.all(media.map(async (item) => {
                            if (item.type.includes('image/') || item.type.includes('video/')) {
                                const url = await uploadMediaFiles(item);
                                mediaURL.push(JSON.stringify({
                                    type: item.type,
                                    url: url
                                }));
                            }
                        }));
                        axios.post(`${process.env.BACKEND_DOMAIN_NAME}/feed/createpost/`, {
                            ...formData,
                            media: mediaURL,
                        }, option)
                            .then(response => {
                                resolve();
                                console.log(response);
                            })
                            .catch(error => {
                                rejected()
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
                    setIsOpen(pre => false)
                }
                else {
                    toast.warn("You can not upload without any media file.")
                }
            }}>
            {({ values, handleChange, handleSubmit }) => (
                <Form onKeyDown={(e) => {
                    e.key === 'Enter' ? e.preventDefault() : null;
                }}
                    className='pt-8 flex flex-col gap-4'>
                    <h6 className="text-gray-400 text-lg font-bold uppercase">
                        Post Details
                    </h6>
                    <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[50vh]">
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="caption" className="uppercase text-gray-600 text-xs">Caption</Label>
                            <Textarea placeholder="Type your caption." rows="7" name="caption" onChange={(e) => {
                                handleChange(e)
                                setFormData({
                                    ...formData,
                                    caption: e.target.value
                                })
                            }}
                                value={values.caption}
                                className="border-0 p-3 rounded text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 shadow w-full" />
                        </div>
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="visibility" className="uppercase text-gray-600 text-xs">Visibility</Label>
                            <Select onValueChange={(e) => {
                                setFormData({
                                    ...formData,
                                    visibility: e
                                })
                            }}
                                defaultValue="all">
                                <SelectTrigger className="border-0 p-3 rounded text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 shadow w-full">
                                    <SelectValue placeholder="Select a visibility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Visibility</SelectLabel>
                                        <SelectItem value="all">Everyone</SelectItem>
                                        <SelectItem value="connections">Connections</SelectItem>
                                        <SelectItem value="me">Only Me</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-2 w-full flex flex-col gap-2 px-1">
                            <Label htmlFor="tags" className="uppercase text-gray-600 text-xs">Tags</Label>
                            <Input type="text" placeholder="Enter a tags"
                                className="border-0 p-3 rounded text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 shadow w-full"
                                disabled={tags.length >= 3 ? true : false} value={tagsInput} onChange={e => setTagsInput(pre => e.target.value)} onKeyUp={e => e.key === 'Enter' ? addTags() : null} />
                            {
                                tags.length > 0 ? <div className='flex items-center gap-2 my-2'>
                                    {
                                        tags.map((tag, index) => (
                                            <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full pl-4 pr-2 py-2 text-xs font-semibold'>
                                                #{tag}
                                                <span className='cursor-pointer rounded-full bg-gray-300 p-1' onClick={() => removeTags(tag)}>
                                                    <AiOutlineClose />
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div> : null
                            }
                        </div>
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="Media" className="uppercase text-gray-600 text-xs">Media</Label>
                            <MediaUploader media={media} />
                        </div>
                    </div>
                    <Button type='submit' onClick={handleSubmit}>
                        Upload
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
export default CreateFBPost