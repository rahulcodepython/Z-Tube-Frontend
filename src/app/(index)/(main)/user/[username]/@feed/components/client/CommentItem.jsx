"use client"
import React from 'react'
import {Avatar} from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import ReplyModal from "@/app/(index)/(main)/user/[username]/@feed/components/client/ReplyModal";
import EditCommentModal from "@/app/(index)/(main)/user/[username]/@feed/components/client/EditCommentModal";

const CommentItem = ({commentItem, setComments, post, setPost, reply}) => {
    const [comment, setComment] = React.useState(commentItem)

    return (
        <div className={'flex flex-col items-center justify-between gap-4 mb-4 last:mb-0'}>
            <div className={`flex items-center justify-between w-full relative ${!reply && 'pr-[2.4rem]'}`}>
                <div className='flex items-start gap-2'>
                    <Avatar className="w-8 h-8">
                        <Image src={comment.uploader.image || '/image/user.png'} width={32} height={32} alt={''}/>
                    </Avatar>
                    <div className="space-y-1">
                        <Link href={`/user/${comment.uploader.username}`}
                              className="text-sm font-semibold">{comment.uploader.name}</Link>
                        <p className="text-xs">
                            {comment.comment}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground gap-4">
                            <div>{comment.createdAt}</div>
                            {reply && <ReplyModal post={post} comment={comment} setPost={setPost}/>}
                            <EditCommentModal comment={comment} setComment={setComment}/>
                        </div>
                    </div>
                </div>
            </div>
            {
                comment.children ? <div className={'ml-20 w-full'}>
                    {
                        comment.children.map((item, index) => {
                            return <CommentItem post={post} setPost={setPost} commentItem={item}
                                                setComments={setComments} key={index} reply={false} />
                        })
                    }
                </div> : null
            }
        </div>
    )
}

export default CommentItem