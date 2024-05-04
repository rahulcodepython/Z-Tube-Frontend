import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateFeed from "@/app/(index)/(main)/user/[username]/@feed/components/client/CreateFeed";

const FeedLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <Tabs defaultValue="feeds" className="w-full grid grid-cols-4 gap-12 mt-12">
            <TabsList className="grid grid-cols-1 col-span-1 h-fit">
                <TabsTrigger value="feeds">Posts</TabsTrigger>
                <TabsTrigger value="createFeed">Create Feed</TabsTrigger>
            </TabsList>
            <div className='col-span-3'>
                <TabsContent value="feeds" className="mt-0">
                    {children}
                </TabsContent>
                <TabsContent value="createFeed">
                    <CreateFeed />
                </TabsContent>
            </div>
        </Tabs>
    )
}

export default FeedLayout