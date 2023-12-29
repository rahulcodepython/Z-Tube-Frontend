"use client"
import ToltipButton from "@/app/(index)/components/client/ToltipButton"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { HiOutlineViewGridAdd } from "@/data/icons/icons"
import CreateFBPost from "./posts/CreateFBPost"
import { Context } from '@/context/Context';
import React from "react"
import { toast } from 'react-toastify';

const CreatePost = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const { isAuthenticated, isAccessToken } = React.useContext(Context)

    React.useEffect(() => {
        (!isAccessToken && !isAuthenticated) ? setIsOpen(pre => false) : null
    }, [isOpen])


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <DialogTrigger asChild>
                <p onClick={() => { !isAccessToken && !isAuthenticated ? toast.warn("You re not signed in.") : null }}>
                    <ToltipButton title={<HiOutlineViewGridAdd />} desc={`Create Post`} />
                </p>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="fd" className="">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="fd">Feed</TabsTrigger>
                        <TabsTrigger value="ct">Content</TabsTrigger>
                        <TabsTrigger value="re">Reels</TabsTrigger>
                        <TabsTrigger value="bg">Blog</TabsTrigger>
                        <TabsTrigger value="tw">Tweet</TabsTrigger>
                    </TabsList>
                    <TabsContent value="fd">
                        <CreateFBPost setIsOpen={setIsOpen} />
                    </TabsContent>
                    <TabsContent value="ct">
                        <p>Youtube</p>
                    </TabsContent>
                    <TabsContent value="re">
                        <p>Reels</p>
                    </TabsContent>
                    <TabsContent value="bg">
                        <p>Blog</p>
                    </TabsContent>
                    <TabsContent value="tw">
                        <p>Tweet</p>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
export default CreatePost