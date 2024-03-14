import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoChatbubbleOutline } from '@/data/icons/icons'
import ReplyForm from "@/app/(index)/(main)/user/[username]/@feed/components/client/ReplyForm";

const ReplyModal = ({post, setPost, comment, setComments}) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <IoChatbubbleOutline className='text-sm' />
                    <span className='text-xs'>Reply</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reply</DialogTitle>
                    <DialogDescription>
                        <ReplyForm post={post} comment={comment} setComments={setComments} setPost={setPost} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ReplyModal