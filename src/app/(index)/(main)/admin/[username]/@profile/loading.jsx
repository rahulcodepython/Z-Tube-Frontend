"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (
        <Card className="h-[457.66px] rounded-lg shadow-none divide-y">
            <CardHeader className='h-[297.66px] p-0'>
                <Skeleton className="w-full h-full" />
            </CardHeader>
            <CardContent className="h-[160px] relative px-4 py-5 flex items-center justify-start gap-8">
                <Skeleton className="rounded-lg w-[120px] h-[120px]" />
                <div className='space-y-6'>
                    <Skeleton className="h-4 w-[200px]" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className='absolute bottom-5 right-4 flex items-center justify-end gap-4'>
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-28" />
                </div>
            </CardContent>
        </Card>
    )
}

export default Loading