"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from 'next/navigation'
import { FeedProvider } from '@/context/FeedContext'

const Layout = ({ children, params, profile, feed, ecom }: {
    children: React.ReactNode
    profile: React.ReactNode
    feed: React.ReactNode
    ecom: React.ReactNode
    params: {username: string}
}) => {
    const [defaultTab, setDefaultTab] = React.useState<string>('profile')
    const [loading, setLoading] = React.useState(true)

    const search = useSearchParams()
    const router = useRouter()

    React.useEffect(() => {
        setDefaultTab(() => search.get('tabs') ?? 'profile')
        setLoading(false)
    }, [search.get('tabs')])

    return (
        !loading && <div className='mx-auto container'>
                <section className='space-y-4'>
                    {profile}
                    <Tabs defaultValue={defaultTab} className="w-full">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="profile" onClick={() => router.push(`/user/${params.username}`)}>Profile</TabsTrigger>
                            <TabsTrigger value="feed" onClick={() => router.push(`/user/${params.username}?tabs=feed`)}>Feed</TabsTrigger>
                            <TabsTrigger value="ecom" onClick={() => router.push(`/user/${params.username}?tabs=ecom`)}>ECommerce</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            {children}
                        </TabsContent>
                        <TabsContent value="feed">
                            <FeedProvider>
                                {feed}
                            </FeedProvider>
                        </TabsContent>
                        <TabsContent value="ecom">
                            {ecom}
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
    )
}

export default Layout