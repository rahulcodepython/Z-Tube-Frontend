"use client"
import React from 'react'
import { DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area'
import FeedComment from '../client/FeedComment'
import ReplyForm from './ReplyForm'
import { FetchComments } from '@/utils'
import { Context } from "@/context/Context";

const Comment = ({ post }) => {
    const { isAccessToken, accessToken } = React.useContext(Context)

    const [comments, setComments] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const handler = async () => {
            await FetchComments(isAccessToken, accessToken, post.id, setComments)
            setLoading(pre => false)
        }
        handler();
    }, [])


    return (
        loading ? "Loading..." :
            <DialogDescription>
                <ScrollArea className="h-[300px] pt-4 pb-2 pr-4 space-y-3">
                    {
                        comments.map((item, index) => {
                            return <FeedComment key={index} postid={post.id} comments={item} setComments={setComments} />
                        })
                    }
                </ScrollArea>
                <ReplyForm postid={post.id} setComments={setComments} />
            </DialogDescription>
    )
}

export default Comment