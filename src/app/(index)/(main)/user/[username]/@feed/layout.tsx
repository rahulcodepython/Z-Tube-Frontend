"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateFeed from "@/app/(index)/(main)/user/[username]/@feed/components/client/CreateFeed";
import { UserContext, UserContextType } from "@/context/UserContext";

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
    const userContext = React.useContext<UserContextType | undefined>(UserContext);

    const parentLoading = userContext?.parentLoading
    const isError = userContext?.isError

    return !parentLoading && isError ? <div className={'w-full flex justify-center items-center mt-8'}>
        There is some issue.
    </div> : <Tabs defaultValue="feeds">
        <TabsList className='w-full mb-4'>
            <TabsTrigger value="feeds">Posts</TabsTrigger>
            <TabsTrigger value="createFeed">Create Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="feeds">
            {children}
        </TabsContent>
        <TabsContent value="createFeed">
            <CreateFeed />
        </TabsContent>
    </Tabs>
}

export default FeedLayout