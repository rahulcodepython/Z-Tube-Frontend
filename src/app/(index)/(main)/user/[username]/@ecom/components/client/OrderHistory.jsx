import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const OrderHistory = () => {
    return (
        <div className='flex flex-col gap-8'>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className='flex items-center gap-8'>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Order Number</span>
                            <span className='font-light'>WU88191111</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Date Placed</span>
                            <span className='font-light'>Jul 6, 2021</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Total Amount</span>
                            <span className='font-light'>$160.00</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button variant="outline">View Order</Button>
                        <Button variant="outline">View Invoice</Button>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className='p-0 divide-y divide-border'>
                    <div className='p-6 grid grid-cols-6 gap-8'>
                        <Image src='/image/product.png' width={160} height={160} />
                        <div className='col-span-5 flex flex-col justify-between'>
                            <div className='flex items-center justify-between'>
                                <span className='text-md'>
                                    Lorem ipsum, dolor sit amet consectetur .
                                </span>
                                <div>
                                    $100.00
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    Delivered on Jul 6, 2021
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button variant="outline">Return</Button>
                                    <Button variant="outline">Buy Again</Button>
                                    <Button variant="outline">View Product</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-6 grid grid-cols-6 gap-8'>
                        <Image src='/image/product.png' width={160} height={160} />
                        <div className='col-span-5 flex flex-col justify-between'>
                            <div className='flex items-center justify-between'>
                                <span className='text-md'>
                                    Lorem ipsum, dolor sit amet consectetur .
                                </span>
                                <div>
                                    $100.00
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    Delivered on Jul 6, 2021
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button variant="outline">Return</Button>
                                    <Button variant="outline">Buy Again</Button>
                                    <Button variant="outline">View Product</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className='flex items-center gap-8'>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Order Number</span>
                            <span className='font-light'>WU88191111</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Date Placed</span>
                            <span className='font-light'>Jul 6, 2021</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Total Amount</span>
                            <span className='font-light'>$160.00</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button variant="outline">View Order</Button>
                        <Button variant="outline">View Invoice</Button>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className='p-0 divide-y divide-border'>
                    <div className='p-6 grid grid-cols-6 gap-8'>
                        <Image src='/image/product.png' width={160} height={160} />
                        <div className='col-span-5 flex flex-col justify-between'>
                            <div className='flex items-center justify-between'>
                                <span className='text-md'>
                                    Lorem ipsum, dolor sit amet consectetur .
                                </span>
                                <div>
                                    $100.00
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    Delivered on Jul 6, 2021
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button variant="outline">Return</Button>
                                    <Button variant="outline">Buy Again</Button>
                                    <Button variant="outline">View Product</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-6 grid grid-cols-6 gap-8'>
                        <Image src='/image/product.png' width={160} height={160} />
                        <div className='col-span-5 flex flex-col justify-between'>
                            <div className='flex items-center justify-between'>
                                <span className='text-md'>
                                    Lorem ipsum, dolor sit amet consectetur .
                                </span>
                                <div>
                                    $100.00
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    Delivered on Jul 6, 2021
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button variant="outline">Return</Button>
                                    <Button variant="outline">Buy Again</Button>
                                    <Button variant="outline">View Product</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderHistory