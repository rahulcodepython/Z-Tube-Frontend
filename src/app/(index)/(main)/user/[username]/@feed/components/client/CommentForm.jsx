"use client"
import React from 'react'
import { BiSend } from '@/data/icons/icons'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext'
import { ReloadIcon } from '@radix-ui/react-icons'
import { DateTimeParser } from '@/utils'
import axios from "axios";

const CommentForm = ({ post, setComments, setPost }) => {
    const [comment, setComment] = React.useState("");
    const [loading, setLoading] = React.useState(false)

    const { accessToken } = React.useContext(AuthContext)

    return (
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-2 pt-4'>
            <Textarea placeholder="Add a comment..." rows="3" value={comment} onChange={e => setComment(pre => e.target.value)} class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0" />
            {
                loading ? <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> : <Button onClick={() => CreateComment(accessToken, comment, post, setComments, setLoading, setPost)}>
                    <BiSend className='text-base' />
                    <span>
                        Submit
                    </span>
                </Button>
            }
        </form>
    )
}

const CreateComment = async (accessToken, comment, post, setComments, setLoading, setPost) => {
    setLoading(pre => true)
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/createcomment/${post.id}/`,
        headers: {
            Authorization: `JWT ${accessToken}`,
        },
        data: {
            comment: comment,
            createdAt: DateTimeParser(Date.now()),
        }
    };
    await axios.request(options)
        .then(response => {
            setComments(pre => [...pre, response.data.comment]);
            setPost({ ...post, commentNo: response.data.commentNo })
        })
        .catch(error => { });
    setLoading(pre => false)
}

export default CommentForm