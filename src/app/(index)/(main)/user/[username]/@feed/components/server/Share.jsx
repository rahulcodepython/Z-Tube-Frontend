import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RiShareForwardLine } from '@/data/icons/icons'

const Share = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <RiShareForwardLine className='text-lg' />
                    <span className='text-xs'>Share</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Share