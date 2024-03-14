"use client"
import React from 'react'
import {DialogDescription} from "@/components/ui/dialog"
import {ScrollArea} from '@/components/ui/scroll-area'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import {AuthContext} from "@/context/AuthContext";
import axios from "axios";

const Comment = ({post, setPost}) => {
    const {accessToken} = React.useContext(AuthContext)

    const [comments, setComments] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const handler = async () => {
            await FetchComments(accessToken, post.id, setComments)
            setLoading(pre => false)
        }
        handler();
    }, [])

    return loading ? "Loading..." : <DialogDescription>
            <ScrollArea className="h-[300px] pt-4 pb-2 pr-4">
                {
                    comments.map((item, index) => {
                        return <CommentItem key={index} post={post} setPost={setPost} commentItem={item} setComments={setComments} reply={true} />
                    })
                }
            </ScrollArea>
            <CommentForm post={post} setComments={setComments} setPost={setPost}/>
        </DialogDescription>
}

const FetchComments = async (accessToken, postid, setComments) => {
    const options = {
        method: 'GET',
        url: `${process.env.BASE_API_URL}/feed/viewcomment/${postid}/`,
        headers: {
            Authorization: `JWT ${accessToken}`
        }
    };

    await axios.request(options)
        .then(response => {
            setComments(pre => response.data);
        })
        .catch(error => {
        });
}

export default Comment