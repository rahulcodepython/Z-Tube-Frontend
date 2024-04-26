import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingCart } from "@/data/icons/icons";
import { Link } from 'next-view-transitions'

const EComAllProducts = () => {
    return <div className={'grid grid-cols-4 gap-4 mx-24 mt-4'}>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => {
                return <ProductItem key={index} />
            })
        }
    </div>
}

export const ProductItem = () => {
    return <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-100 dark:border-border bg-white dark:bg-background shadow w-full">
        <div className="relative mx-3 mt-3 flex h-52 overflow-hidden rounded-sm">
            <Image className="object-cover" src="/image/product.png" alt="product image" width={500} height={500} />
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                39% OFF
            </span>
        </div>
        <div className="mt-4 px-5 pb-5 flex flex-col gap-4">
            <Link href={'/ecom/product/fashion/t-shirt'} className={'group'}>
                <h5 className="text-sm font-bold tracking-tight group-hover:underline">
                    Nike Air MX Super 2500 - Red
                </h5>
            </Link>
            <div className="flex items-center justify-between">
                <p className={'flex gap-1 items-end'}>
                    <span className="text-xl font-bold">
                        $449
                    </span>
                    <span className="text-sm line-through">
                        $699
                    </span>
                </p>
                <div className="flex items-center">
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarBlank />
                    <span className="mr-2 ml-3 rounded bg-yellow-200 text-black px-2.5 py-0.5 text-xs font-semibold">
                        5.0
                    </span>
                </div>
            </div>
            <Button className={'gap-2 w-full cursor-pointer'}>
                <MdOutlineShoppingCart className={'text-lg'} />
                Add To Cart
            </Button>
        </div>
    </div>

}

export const StarFill = () => {
    return <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
}

export const StarBlank = () => {
    return <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
}

export default EComAllProducts