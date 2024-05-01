"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { AiOutlineClose } from "@/data/icons/icons";

const TagsInput = ({ tags, max, remove, push }) => {
    const [tagsInput, setTagsInput] = React.useState('')

    return <div>
        <Input type="text" placeholder="Enter a tags"
            disabled={tags.length >= max} value={tagsInput}
            onChange={e => setTagsInput(() => e.target.value)}
            onKeyUp={e => {
                e.key === 'Enter' ? push(tagsInput) : null
                e.key === 'Enter' ? setTagsInput('') : null
            }} />
        {
            tags.length > 0 ? <div className='flex items-center gap-2 my-2'>
                {
                    tags.map((tag, index) => {
                        return <div key={index} className='flex items-center justify-center gap-2 rounded-md bg-accent text-foreground pl-3 pr-2 py-2 text-xs font-semibold'>
                            #{tag}
                            <span className='cursor-pointer rounded-full bg-background p-1' onClick={() => remove(index)}>
                                <AiOutlineClose />
                            </span>
                        </div>
                    })
                }
            </div> : null
        }
    </div>
}

export default TagsInput