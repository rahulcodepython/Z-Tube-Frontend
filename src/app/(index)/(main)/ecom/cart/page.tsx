import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React from 'react'
import { Link } from 'next-view-transitions'
import QuantityButton from "@/app/(index)/(main)/ecom/components/client/QuantityButton";

const Cart = () => {
    return (
        <section className='container mx-auto'>
            <h1 className='text-3xl font-bold mb-16'>
                Shopping Cart
            </h1>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 grid grid-cols-1 divide-y divide-border border-t border-b border-border'>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <div className='bg-secondary mx-4 rounded-sm p-8 flex flex-col gap-4 h-fit'>
                    <h1 className='text-lg font-bold'>
                        Order Summary
                    </h1>
                    <div className='grid grid-cols-1 divide-y divide-primary'>
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
                    <Link href={'/ecom/checkout'}>
                        <Button className={'w-full'}>
                            Checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

const CartItem = () => {
    return <div className='py-8 flex items-start justify-between gap-2 h-fit'>
        <div className='grid grid-cols-6 gap-12 w-full'>
            <Image src='/image/product.png' width={100} height={100} alt={'product'} />
            <div className='flex flex-col justify-between w-full col-span-5'>
                <div className='flex gap-8 items-center'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-md'>
                            Product Name
                        </h1>
                        <h3 className='text-sm'>
                            $100.00
                        </h3>
                    </div>
                    <QuantityButton maxAmount={5} />
                </div>
                <div>
                    In Stock
                </div>
            </div>
        </div>
        <Cross2Icon />
    </div>
}

export default Cart