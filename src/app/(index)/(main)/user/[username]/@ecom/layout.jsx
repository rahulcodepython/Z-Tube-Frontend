import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrderHistory from './components/client/OrderHistory'

const EComLayout = ({ children }) => {
    return (
        <Tabs defaultValue="dashboard" className="w-full grid grid-cols-4 gap-12 mt-12">
            <TabsList className="grid grid-cols-1 col-span-1 h-fit">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="order-history">Order History</TabsTrigger>
            </TabsList>
            <div className='col-span-3'>
                <TabsContent value="dashboard" className="mt-0">
                    {children}
                </TabsContent>
                <TabsContent value="order-history" className="mt-0">
                    <OrderHistory />
                </TabsContent>
            </div>
        </Tabs>
    )
}

export default EComLayout