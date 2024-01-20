"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from 'next/navigation'
import { Context } from '@/context/Context'

const Layout = ({ children, params, profile, feed }) => {
    const [defaultTab, setDefaultTab] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    const { isAuthenticated } = React.useContext(Context)

    const search = useSearchParams()
    const router = useRouter()

    React.useEffect(() => {
        if (isAuthenticated) {
            setDefaultTab(pre => search.get('tabs'))
            setLoading(pre => false)
        }
        else {
            router.push("/auth/login")
        }
    }, [search.get('tabs')])

    return (
        !loading && <div className='my-4 mx-auto container'>
            <section className='space-y-4'>
                <div className='space-y-4'>
                    {profile}
                    <Tabs defaultValue={`${defaultTab || 'profile'}`} className="w-full">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="profile" onClick={() => router.push(`/admin/${params.username}`)}>Profile</TabsTrigger>
                            <TabsTrigger value="feed" onClick={() => router.push(`/admin/${params.username}?tabs=feed`)}>Feed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            {children}
                        </TabsContent>
                        <TabsContent value="feed">
                            {feed}
                        </TabsContent>
                    </Tabs>

                    {/* <Menubar className="p-0 mt-2 h-auto border-none shadow-none space-x-2">
                        <MenubarMenu>
                            <Link href={`/admin/${params.username}/`}>
                                <Button>Profile</Button>
                            </Link>
                        </MenubarMenu>
                        <MenubarMenu>
                            <Link href={'#'}>
                                <Button>Friends</Button>
                            </Link>
                        </MenubarMenu>
                        <MenubarMenu>
                            <Link href={`/admin/${params.username}/feed/`}>
                                <Button>Feed</Button>
                            </Link>
                        </MenubarMenu>
                    </Menubar> */}
                </div>
            </section>
        </div>
    )
}

export default Layout