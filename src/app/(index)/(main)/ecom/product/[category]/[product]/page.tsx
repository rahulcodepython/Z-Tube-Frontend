"use client"
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md"
import { Toggle } from "@/components/ui/toggle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { StarFill, StarBlank } from "@/app/(index)/(main)/ecom/components/server/Starts";
import { Link } from "next-view-transitions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";
import QuantityButton from "@/app/(index)/(main)/ecom/components/client/QuantityButton";


const Product = ({ params }: { params: { category: string, product: string } }) => {
    return <section>
        <div className="mx-24 flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/ecom">ECommerce</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/ecom/${params.category}`}>{params.category}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Link href={'/ecom/cart'} className="p-3 cursor-pointer rounded-full hover:bg-secondary">
                <MdOutlineShoppingCart className={'text-lg'} />
            </Link>
        </div>
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <Image src="/image/product.png" alt="Two each of gray, white, and black shirts laying flat." className="h-full w-full object-cover object-center" width={384} height={544} />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <Image src="/image/product1.png" alt="Model wearing plain black basic tee." className="h-full w-full object-cover object-center" height={256} width={384} />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <Image src="/image/product1.png" alt="Model wearing plain gray basic tee." className="h-full w-full object-cover object-center" width={384} height={256} />
                </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <Image src="/image/product.png" alt="Model wearing plain white basic tee." className="h-full w-full object-cover object-center" width={384} height={256} />
            </div>
        </div>
        <div className="mx-40 grid grid-cols-3 mt-16 gap-8">
            <div className="col-span-2">
                <h1 className="text-2xl font-bold">Basic Tee 6-Pack</h1>
                <div className="py-10 flex flex-col gap-10 w-full">
                    <div className="flex flex-col gap-4 w-full">
                        <h3>Description</h3>
                        <p>The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your outfit? Our white tee has you covered.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-medium">Highlights</h3>
                        <ul role="list" className="list-disc space-y-2 ml-8 text-sm">
                            <li>Hand cut and sewn locally</li>
                            <li>Dyed with our proprietary colors</li>
                            <li>Pre-washed &amp; pre-shrunk</li>
                            <li>Ultra-soft 100% cotton</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-sm font-medium">Details</h2>
                        <p>
                            The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <Separator orientation="vertical" />
                <div className="flex flex-col justify-between flex-1 h-full ml-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="text-3xl tracking-tight">$192</p>
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
                        <div className="flex items-start">
                            <span>
                                Max quantity: 5 in stock
                            </span>
                        </div>
                        <QuantityButton maxAmount={5} />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <Button className={'gap-2 w-full'}>
                            <MdOutlineShoppingCart className={'text-lg'} />
                            Add To Cart
                        </Button>
                        <WishlistButton />
                    </div>
                </div>
            </div>
        </div>
        <div className="container mx-auto grid grid-cols-3 gap-20 my-20">
            <div className="flex flex-col gap-8 items-start">
                <h3 className="text-2xl font-bold">Customer Reviews</h3>
                <div className="flex items-center gap-1">
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarBlank />
                    <span className="ml-4">
                        Based on 1243 reviews
                    </span>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-4 items-center w-full">
                        <span>5</span>
                        <StarFill />
                        <div className="flex-1 w-full bg-secondary h-1">
                            <div className="bg-yellow-400 w-[80%] h-1"></div>
                        </div>
                        <span>80%</span>
                    </div>
                    <div className="flex gap-4 items-center w-full">
                        <span>4</span>
                        <StarFill />
                        <div className="flex-1 w-full bg-secondary h-1">
                            <div className="bg-yellow-400 w-[80%] h-1"></div>
                        </div>
                        <span>80%</span>
                    </div>
                    <div className="flex gap-4 items-center w-full">
                        <span>3</span>
                        <StarFill />
                        <div className="flex-1 w-full bg-secondary h-1">
                            <div className="bg-yellow-400 w-[80%] h-1"></div>
                        </div>
                        <span>80%</span>
                    </div>
                    <div className="flex gap-4 items-center w-full">
                        <span>2</span>
                        <StarFill />
                        <div className="flex-1 w-full bg-secondary h-1">
                            <div className="bg-yellow-400 w-[80%] h-1"></div>
                        </div>
                        <span>80%</span>
                    </div>
                    <div className="flex gap-4 items-center w-full">
                        <span>1</span>
                        <StarFill />
                        <div className="flex-1 w-full bg-secondary h-1">
                            <div className="bg-yellow-400 w-[80%] h-1"></div>
                        </div>
                        <span>80%</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg">Share Thoughts</h1>
                    <span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, mollitia?</span>
                </div>
                <WriteReview />
            </div>
            <div className="flex flex-col gap-8 divide-y divide-border col-span-2">
                <div className="flex flex-col w-full gap-4 pt-8 first:pt-0">
                    <div className="flex items-center gap-4">
                        <Image src="/image/user.png" alt="person" width={50} height={50} className="rounded-full" />
                        <div className="flex flex-col gap-2">
                            <span>Rahul Das</span>
                            <span className="flex items-center gap-1">
                                <StarFill />
                                <StarFill />
                                <StarFill />
                                <StarFill />
                                <StarBlank />
                            </span>
                        </div>
                    </div>
                    <div className="italic text-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia beatae tempore tenetur qui nostrum vel atque distinctio sint quibusdam mollitia nihil et enim debitis, illo cupiditate ipsam! Odit, sequi laborum?
                    </div>
                </div>
                <div className="flex flex-col w-full gap-4 pt-8 first:pt-0">
                    <div className="flex items-center gap-4">
                        <Image src="/image/user.png" alt="person" width={50} height={50} className="rounded-full" />
                        <div className="flex flex-col gap-2">
                            <span>Rahul Das</span>
                            <span className="flex items-center gap-1">
                                <StarFill />
                                <StarFill />
                                <StarFill />
                                <StarFill />
                                <StarBlank />
                            </span>
                        </div>
                    </div>
                    <div className="italic text-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia beatae tempore tenetur qui nostrum vel atque distinctio sint quibusdam mollitia nihil et enim debitis, illo cupiditate ipsam! Odit, sequi laborum?
                    </div>
                </div>
            </div>
        </div>
    </section>
}

const WishlistButton = () => {
    const [isHeart, setIsHeart] = React.useState<boolean>(false)

    return <Toggle onPressedChange={() => setIsHeart(!isHeart)}
        className={'p-0 pt-1 rounded-full w-12 h-12 items-center justify-center'}>
        <FaHeart className={`${isHeart && `text-red-600`} w-12 text-xl`} />
    </Toggle>
}

const WriteReview = () => {
    return <Dialog>
        <DialogTrigger className="w-full">
            <Button variant="outline" className="w-full">Write a Review</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Describe Your Thoughts</DialogTitle>
                <DialogDescription className="pt-6">
                    <RatingStar />
                    <Textarea placeholder="Write your thoughts here..." className="mt-4" />
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>

}

const RatingStar = () => {
    const [ratings, setRatings] = React.useState(0);

    return <div className="rating">
        <input type="radio" id="star-1" name="star-radio" value={5} onChange={e => setRatings(Number(e.target.value))} />
        <label htmlFor="star-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
        </label>
        <input type="radio" id="star-2" name="star-radio" value={4} onChange={e => setRatings(Number(e.target.value))} />
        <label htmlFor="star-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
        </label>
        <input type="radio" id="star-3" name="star-radio" value={3} onChange={e => setRatings(Number(e.target.value))} />
        <label htmlFor="star-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
        </label>
        <input type="radio" id="star-4" name="star-radio" value={2} onChange={e => setRatings(Number(e.target.value))} />
        <label htmlFor="star-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
        </label>
        <input type="radio" id="star-5" name="star-radio" value={1} onChange={e => setRatings(Number(e.target.value))} />
        <label htmlFor="star-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path pathLength="360" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path></svg>
        </label>
    </div>
}

export default Product