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

const CreatePost = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p>
                    <ToltipButton title={<HiOutlineViewGridAdd />} desc={`Create Post`} />
                </p>
            </DialogTrigger>
            <DialogContent className="max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="account" className="">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="fb">Facebook</TabsTrigger>
                        <TabsTrigger value="yt">Youtube</TabsTrigger>
                        <TabsTrigger value="re">Reels</TabsTrigger>
                        <TabsTrigger value="bg">Blog</TabsTrigger>
                        <TabsTrigger value="tw">Tweet</TabsTrigger>
                    </TabsList>
                    <TabsContent value="fb">
                        <CreateFBPost />
                    </TabsContent>
                    <TabsContent value="yt">
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