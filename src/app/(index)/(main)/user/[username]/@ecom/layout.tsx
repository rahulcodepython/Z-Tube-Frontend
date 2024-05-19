"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from 'next/navigation'
import CreateProduct from "@/app/(index)/(main)/user/[username]/@ecom/components/client/CreateProduct";
import ListProducts from "@/app/(index)/(main)/user/[username]/@ecom/components/client/ListProducts";
import OrderHistory from "@/app/(index)/(main)/user/[username]/@ecom/components/client/OrderHistory";
import { UserContext, UserContextType } from "@/context/UserContext";
import { AuthContext, AuthContextType } from '@/context/AuthContext';

const EComLayout = ({ params, children }: { params: { username: string }, children: React.ReactNode }) => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const profile = authContext?.profile

    return profile?.isMarchant ? <EComPartialLayout params={params} children={children} /> : children
}

const EComPartialLayout = ({ params, children }: { params: { username: string }, children: React.ReactNode }) => {
    const [defaultTab, setDefaultTab] = React.useState<string>('dashboard')
    const [loading, setLoading] = React.useState<boolean>(true)

    const userContext = React.useContext<UserContextType | undefined>(UserContext);
    const parentLoading = userContext?.parentLoading
    const isError = userContext?.isError

    const search = useSearchParams()
    const router = useRouter()

    const subtabs = search.get('subtabs')

    React.useEffect(() => {
        setDefaultTab(() => subtabs ?? 'dashboard')
        setLoading(false)
    }, [subtabs])

    return !parentLoading && isError ? <div className={'w-full flex justify-center items-center mt-8'}>
        There is some issue.
    </div> : !loading && <Tabs defaultValue={defaultTab}>
        <TabsList className="mb-4 w-full">
            <TabsTrigger value="dashboard"
                onClick={() => router.push(`/user/${params.username}?tabs=ecom&subtabs=dashboard`)}>Dashboard</TabsTrigger>
            <TabsTrigger value="create-product"
                onClick={() => router.push(`/user/${params.username}?tabs=ecom&subtabs=create-product`)}>Create
                Product</TabsTrigger>
            <TabsTrigger value="list-product"
                onClick={() => router.push(`/user/${params.username}?tabs=ecom&subtabs=list-product`)}>List
                Product</TabsTrigger>
            <TabsTrigger value="order-history"
                onClick={() => router.push(`/user/${params.username}?tabs=ecom&subtabs=order-history`)}>Order
                History</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-0">
            {children}
        </TabsContent>
        <TabsContent value="create-product" className="mt-0">
            <CreateProduct />
        </TabsContent>
        <TabsContent value="list-product" className="mt-0">
            <ListProducts />
        </TabsContent>
        <TabsContent value="order-history" className="mt-0">
            <OrderHistory />
        </TabsContent>
    </Tabs>
}

export default EComLayout