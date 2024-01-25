"use client"
import React from 'react'
import { BiSend } from '@/data/icons/icons'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CreateComment } from '@/utils/index'
import { Context } from '@/context/Context'
import { ReloadIcon } from '@radix-ui/react-icons'

const ReplyForm = ({ post, setComments, setPost }) => {
    const [comment, setComment] = React.useState("");
    const [loading, setLoading] = React.useState(false)

    const { isAccessToken, accessToken } = React.useContext(Context)

    return (
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-2 pt-4'>
            <Textarea placeholder="Add a comment..." rows="3" value={comment} onChange={e => setComment(pre => e.target.value)} class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0" />
            {
                loading ? <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> : <Button onClick={() => CreateComment(isAccessToken, accessToken, comment, post, setComments, setLoading, setPost)}>
                    <BiSend className='text-base' />
                    <span>
                        Send
                    </span>
                </Button>
            }
        </form>
    )
}

export default ReplyForm