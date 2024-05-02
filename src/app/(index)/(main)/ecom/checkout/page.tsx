import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Cross2Icon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const Checkout = () => {
    return (
        <section className='container mx-auto'>
            <h1 className='text-3xl font-bold mb-16'>
                Checkout
            </h1>
            <div className='grid grid-cols-2 gap-24'>
                <div className='flex flex-col gap-12 divide-y divide-border'>
                    <div className='flex flex-col gap-8'>
                        <div className='text-xl'>Contact Information</div>
                        <div>
                            <div className='flex flex-col gap-3'>
                                <Label>Email</Label>
                                <Input type='email' placeholder="Enter you email" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 pt-8'>
                        <div className='text-xl'>Shipping Information</div>
                        <div className='flex flex-col gap-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-3'>
                                    <Label>First Name</Label>
                                    <Input type='text' placeholder="Enter you first name" />
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <Label>Last Name</Label>
                                    <Input type='text' placeholder="Enter you last name" />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <Label>Company</Label>
                                <Input type='text' placeholder="Enter you company" />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <Label>Address</Label>
                                <Input type='text' placeholder="Enter you address" />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <Label>Appartment & Location</Label>
                                <Input type='text' placeholder="Enter you house name or near places" />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-3'>
                                    <Label>City</Label>
                                    <Input type='text' placeholder="Enter you city" />
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <Label>Country</Label>
                                    <Input type='text' placeholder="Enter you contry" />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-3'>
                                    <Label>State</Label>
                                    <Input type='text' placeholder="Enter you state" />
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <Label>Postal Code</Label>
                                    <Input type='text' placeholder="Enter you postal code" />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <Label>Phone</Label>
                                <Input type='number' placeholder="Enter you phone" />
                            </div>
                        </div>
                    </div>
                </div>
                <Card className="h-fit">
                    <CardContent className="divide-y divide-border px-0 border-b border-border pb-0">
                        <CheckoutProductItem />
                        <CheckoutProductItem />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className='grid grid-cols-1 divide-y divide-border w-full'>
                            <div className='flex items-center justify-between py-4'>
                                <span>
                                    Subtotal
                                </span>
                                <span>
                                    $100.00
                                </span>
                            </div>
                            <div className='flex items-center justify-between py-4'>
                                <span>
                                    Shipping
                                </span>
                                <span>
                                    $10.00
                                </span>
                            </div>
                            <div className='flex items-center justify-between py-4'>
                                <span>
                                    Tax
                                </span>
                                <span>
                                    $5.00
                                </span>
                            </div>
                            <div className='font-extrabold flex items-center justify-between py-4'>
                                <span>
                                    Total
                                </span>
                                <span>
                                    $115.00
                                </span>
                            </div>
                        </div>
                        <Button className={'w-full'}>
                            Confirm Order
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}

const CheckoutProductItem = () => {
    return <div className='p-8 flex items-start justify-between gap-2 h-fit'>
        <div className='grid grid-cols-3 gap-2 w-full'>
            <Image src='/image/product.png' width={100} height={100} alt={'product'} />
            <div className='flex gap-8 items-start w-full col-span-2'>
                <div className='flex flex-col gap-2 flex-1'>
                    <h1 className='text-md'>
                        Product Name
                    </h1>
                    <h3 className='text-sm'>
                        $100.00 * 2
                    </h3>
                </div>
            </div>
        </div>
        <Cross2Icon />
    </div>
}

export default Checkout