import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Menubar,
} from "@/components/ui/menubar"
import { Separator } from '@/components/ui/separator'

const Loading = () => {

    return (
        <div className='grid grid-cols-1 gap-4 px-[17rem]'>
            <Card>
                <CardHeader className="px-2 py-3">
                    <CardTitle className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-[250px]" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Skeleton className="h-[433px] w-full" />
                </CardContent>
                <CardFooter className="px-2 py-1 flex flex-col">
                    <div className='flex items-center justify-between w-full'>
                        <Skeleton className="w-[56px] h-[8px] rounded-md" />
                        <Skeleton className="w-[136px] h-[8px] rounded-md" />
                    </div>
                    <Separator className="mt-1" />
                    <Menubar className="w-full justify-between border-none p-0">
                        <Skeleton className="w-[136px] h-[26px] rounded-md" />
                        <Skeleton className="w-[136px] h-[26px] rounded-md" />
                        <Skeleton className="w-[136px] h-[26px] rounded-md" />
                    </Menubar>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Loading