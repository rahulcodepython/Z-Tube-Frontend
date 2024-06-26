"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
    tags: Array<string> | undefined
    max: number
    push: (tagsInput: string) => void
    remove: (index: number) => void
}

const TagsInput = ({ tags, max, remove, push }: Props) => {
    const [tagsInput, setTagsInput] = React.useState<string>('')

    return <div className="border rounded-md border-border flex items-center justify-center px-1 py-[0.15rem]">
        {
            tags && tags.length > 0 ? <div className='flex items-center gap-2'>
                {
                    tags.map((tag: string, index: number) => {
                        return <div key={index} className='flex items-center justify-center gap-2 rounded-md bg-accent text-foreground pl-2 pr-1 py-1.5 text-xs font-semibold'>
                            #{tag}
                            <span className='cursor-pointer rounded-full bg-background p-1' onClick={() => remove(index)}>
                                <AiOutlineClose />
                            </span>
                        </div>
                    })
                }
            </div> : null
        }
        <Input type="text" placeholder="Enter a tags"
            className="border-none py-0"
            disabled={tags && tags.length >= max} value={tagsInput}
            onChange={e => setTagsInput(() => e.target.value)}
            onKeyUp={e => {
                e.key === 'Enter' ? push(tagsInput) : null
                e.key === 'Enter' ? setTagsInput('') : null
            }} />
    </div>
}

export default TagsInput