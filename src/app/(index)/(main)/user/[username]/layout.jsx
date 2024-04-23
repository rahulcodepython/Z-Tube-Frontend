"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from 'next/navigation'
import { ProfileProvider } from '@/context/ProfileContext'
import { FeedProvider } from '@/context/FeedContext'

const Layout = ({ children, params, profile, feed }) => {
    const [defaultTab, setDefaultTab] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    const search = useSearchParams()
    const router = useRouter()

    React.useEffect(() => {
        setDefaultTab(() => search.get('tabs'))
        setLoading(() => false)
    }, [search.get('tabs')])

    return (
        !loading && <ProfileProvider>
            <div className='my-4 mx-auto container'>
                <section className='space-y-4'>
                    <div className='space-y-4'>
                        {profile}
                        <Tabs defaultValue={`${defaultTab || 'profile'}`} className="w-full">
                            <TabsList className="w-full justify-start">
                                <TabsTrigger value="profile" onClick={() => router.push(`/user/${params.username}`)}>Profile</TabsTrigger>
                                <TabsTrigger value="feed" onClick={() => router.push(`/user/${params.username}?tabs=feed`)}>Feed</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                {children}
                            </TabsContent>
                            <TabsContent value="feed">
                                <FeedProvider>
                                    {feed}
                                </FeedProvider>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </div>
        </ProfileProvider>
    )
}

export default Layout