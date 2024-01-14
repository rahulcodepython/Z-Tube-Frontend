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
import { Context } from '@/context/Context';
import { ReloadIcon } from "@radix-ui/react-icons"
import { AddTagsCreateFeed, CreateFeedPost, RemoveTagsCreateFeed } from '@/utils';

const CreateFeed = ({ setIsOpen }) => {
    const { accessToken } = React.useContext(Context)

    const [uploading, setUploading] = React.useState(false)
    const [caption, setCaption] = React.useState('')
    const [visibility, setvisibility] = React.useState({
        type: 'public',
        value: []
    })
    const [tagsInput, setTagsInput] = React.useState('')
    const [tags, setTags] = React.useState([])
    const [media, setMedia] = React.useState([])

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
                        disabled={tags.length >= 3 ? true : false} value={tagsInput} onChange={e => setTagsInput(pre => e.target.value)} onKeyUp={e => e.key === 'Enter' ? AddTagsCreateFeed(tagsInput, setTagsInput, tags, setTags) : null} />
                    {
                        tags.length > 0 ? <div className='flex items-center gap-2 my-2'>
                            {
                                tags.map((tag, index) => (
                                    <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full pl-4 pr-2 py-2 text-xs font-semibold text-black'>
                                        #{tag}
                                        <span className='cursor-pointer rounded-full bg-gray-300 p-1' onClick={() => RemoveTagsCreateFeed(tag, setTags)}>
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
            {
                uploading ? <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
                    : <Button type='submit' onClick={async () => await CreateFeedPost(media, setUploading, accessToken, caption, tags, visibility, setIsOpen)}>
                        Upload
                    </Button>
            }
        </form>
    );
};
export default CreateFeed