"use client"
import React from 'react';
import { AiOutlineClose } from '@/data/icons/icons';
import MediaUploader from '../MediaUploader';
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

const CreateFeed = ({ setIsOpen }) => {
    const { accessToken } = React.useContext(Context)

    const [caption, setCaption] = React.useState('')
    const [visibility, setvisibility] = React.useState({
        type: 'public',
        value: []
    })
    const [tagsInput, setTagsInput] = React.useState('')
    const [tags, setTags] = React.useState([])
    const [media, setMedia] = React.useState([])

    const addTags = () => {
        if (tagsInput.trim().length > 0) {
            if (!tags.includes(tagsInput)) {
                setTags(pre => [...pre, tagsInput])
            }
        }
        setTagsInput(pre => '')
    }

    const removeTags = (tag) => {
        setTags(pre => pre.filter(t => t !== tag))
    }

    const uploadMediaFiles = async (item) => {
        let url;
        const fileref = ref(analytics, `Feed/${item.name}`);
        const response = await uploadBytes(fileref, item);
        url = await getDownloadURL(response.ref);
        return url;
    };

    const handleSubmit = async () => {
        if (media.length > 0) {
            const option = {
                headers: {
                    Authorization: `JWT ${accessToken}`,
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
                    caption: caption,
                    tags: tags,
                    visibility: visibility,
                    media: mediaURL,
                }, option)
                    .then(response => {
                        console.log({
                            caption: caption,
                            tags: tags,
                            visibility: visibility,
                            media: mediaURL,
                        })
                        resolve();
                        setIsOpen(pre => false)
                        console.log(response);
                    })
                    .catch(error => {
                        rejected()
                        setIsOpen(pre => false)
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
        }
        else {
            toast.warn("You can not upload without any media file.")
        }
    }

    return (
        <form onKeyDown={e => {
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
                    <Textarea placeholder="Type your caption." rows="7" name="caption" onChange={e => setCaption(pre => e.target.value)}
                        value={caption}
                        className="focus:ring-0 focus-visible:ring-0" />
                </div>
                <div className="col-span-2 grid w-full gap-2 px-1">
                    <Label htmlFor="visibility" className="uppercase text-gray-600 text-xs">Visibility</Label>
                    <Select onValueChange={(e) => setvisibility({
                        type: e,
                        value: visibility.value
                    })}
                        defaultValue="public">
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
                <div className="col-span-2 w-full flex flex-col gap-2 px-1">
                    <Label htmlFor="tags" className="uppercase text-gray-600 text-xs">Tags</Label>
                    <Input type="text" placeholder="Enter a tags"
                        className="focus:ring-0 focus-visible:ring-0"
                        disabled={tags.length >= 3 ? true : false} value={tagsInput} onChange={e => setTagsInput(pre => e.target.value)} onKeyUp={e => e.key === 'Enter' ? addTags() : null} />
                    {
                        tags.length > 0 ? <div className='flex items-center gap-2 my-2'>
                            {
                                tags.map((tag, index) => (
                                    <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full pl-4 pr-2 py-2 text-xs font-semibold text-black'>
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
        </form>
    );
};
export default CreateFeed