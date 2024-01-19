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
import { ScrollArea } from '@/components/ui/scroll-area'
import FeedComment from './FeedComment'
import ReplyForm from './ReplyForm'
import { MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'

const Comment = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <MenubarMenu className="w-full">
            <MenubarTrigger className="w-1/3 flex justify-center items-center cursor-pointer ml-0">
                <Dialog>
                    <DialogTrigger>
                        <div className='flex justify-center items-center gap-1 text-xs'>
                            <IoChatbubbleOutline className='text-lg' />
                            <span>Comments</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl w-[600px]">
                        <DialogHeader>
                            <DialogTitle>2k Comments</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[300px] pt-4 pb-2 pr-4 space-y-3">
                                    {
                                        numbers.slice(0, 6).map((item, index) => {
                                            return <FeedComment key={index} index={index} />
                                        })
                                    }
                                </ScrollArea>
                                <ReplyForm />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </MenubarTrigger>
        </MenubarMenu>
    )
}

export default Comment