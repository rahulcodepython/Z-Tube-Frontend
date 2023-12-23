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

const CreateFBPost = () => {
    const [tagsInput, setTagsInput] = React.useState('')
    const [tags, setTags] = React.useState([])
    const [formData, setFormData] = React.useState({})
    const [media, setMedia] = React.useState({
        image: [],
        videos: [],
        pdf: []
    })

    const addTags = () => {
        if (tagsInput.trim().length > 0) {
            if (!tags.includes(tagsInput)) {
                setFormData({
                    ...formData,
                    tags: JSON.stringify([...tags, tagsInput]),
                })
                setTags(pre => [...pre, tagsInput])
            }
        }
        setTagsInput(pre => '')
    }

    const removeTags = (tag) => {
        setFormData({
            ...formData,
            tags: JSON.stringify(tags.filter(t => t !== tag)),
        })
        setTags(pre => pre.filter(t => t !== tag))
    }

    return (
        <Formik initialValues={{
            initialValues: {
                caption: '',
            }
        }}
            onSubmit={() => console.log(formData)}>
            {({ values, handleChange, handleSubmit }) => (
                <Form onKeyDown={(e) => {
                    e.key === 'Enter' ? e.preventDefault() : null;
                }}
                    className='pt-8 flex flex-col gap-4 overflow-y-scroll h-[80vh]'>
                    <h6 className="text-gray-400 text-lg font-bold uppercase">
                        Post Details
                    </h6>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="caption" className="uppercase text-gray-600 text-xs">Caption</Label>
                            <Textarea placeholder="Type your caption." rows="7" name="caption" onChange={(e) => {
                                handleChange(e)
                                setFormData({
                                    ...formData,
                                    caption: e.target.value
                                })
                            }}
                                value={values.caption} />
                        </div>
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="visibility" className="uppercase text-gray-600 text-xs">Visibility</Label>
                            <Select onValueChange={(e) => {
                                setFormData({
                                    ...formData,
                                    visibility: e
                                })
                            }}>
                                <SelectTrigger className="w-full">
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
                            <Input type="text" placeholder="Enter a tags" disabled={tags.length >= 3 ? true : false} value={tagsInput} onChange={e => setTagsInput(pre => e.target.value)} onKeyUp={e => e.key === 'Enter' ? addTags() : null} />
                            {
                                tags.length > 0 ? <div className='flex items-center gap-2 my-2'>
                                    {
                                        tags.map((tag, index) => (
                                            <div key={index} className='flex items-center justify-center gap-2 bg-gray-200 rounded-full p-2 text-xs font-semibold'>
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
                            <MediaUploader media={media} setMedia={setMedia} formData={formData} setFormData={setFormData} />
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