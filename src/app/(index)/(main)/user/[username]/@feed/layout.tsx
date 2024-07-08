"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserContext, UserContextType } from "@/context/UserContext";
import { AuthContext, AuthContextType } from '@/context/AuthContext';

const FeedLayout = ({ children, createfeed }: {
    children: React.ReactNode,
    createfeed: React.ReactNode
}) => {
    const userContext = React.useContext<UserContextType | undefined>(UserContext);
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext);

    const profile = authContext?.profile

    const parentLoading = userContext?.parentLoading
    const isError = userContext?.isError

    return !parentLoading && isError ? <div className={'w-full flex justify-center items-center mt-8'}>
        There is some issue.
    </div> : <Tabs defaultValue="feeds">
        <TabsList className='w-full mb-4'>
            <TabsTrigger value="feeds">Posts</TabsTrigger>
            {
                profile?.self && <TabsTrigger value="createFeed">Create Feed</TabsTrigger>
            }
        </TabsList>
        <TabsContent value="feeds">
            {children}
        </TabsContent>
        {
            profile?.self && <TabsContent value="createFeed">
                {/* {createfeed} */}
            </TabsContent>
        }
    </Tabs>
}

export default FeedLayout