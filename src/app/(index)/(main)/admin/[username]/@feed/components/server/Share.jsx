import React from 'react'
import {
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
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
        <MenubarMenu className="w-full">
            <MenubarTrigger className="w-1/3 flex justify-center items-center cursor-pointer">
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
            </MenubarTrigger>
        </MenubarMenu>
    )
}

export default Share