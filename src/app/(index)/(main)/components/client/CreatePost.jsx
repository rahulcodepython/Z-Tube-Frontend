"use client"
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
import CreateFeed from "./CreateFeed"
import React from "react"
import CustomTooltip from "@/components/Tooltip"

const CreatePost = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <DialogTrigger asChild>
                <p>
                    <CustomTooltip icon={<HiOutlineViewGridAdd />} text={'Create Post'} />
                </p>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="fd">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="fd">Feed</TabsTrigger>
                        <TabsTrigger value="ct">Content</TabsTrigger>
                        <TabsTrigger value="re">Reels</TabsTrigger>
                        <TabsTrigger value="bg">Blog</TabsTrigger>
                        <TabsTrigger value="tw">Tweet</TabsTrigger>
                    </TabsList>
                    <TabsContent value="fd" className={'focus-visible:ring-0 focus-visible:ring-offset-0'}>
                        <CreateFeed setIsOpen={setIsOpen} />
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