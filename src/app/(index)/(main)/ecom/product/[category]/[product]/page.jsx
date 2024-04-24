"use client"
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { MdOutlineAddShoppingCart, FaHeart, MdOutlineShoppingCart } from "@/data/icons/icons"
import { Toggle } from "@/components/ui/toggle";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { StarBlank, StarFill } from "../../../(all-products)/page";

const Product = ({ params }) => {
    // return <section className="text-gray-600 body-font overflow-hidden container py-8">
    //     <div className="grid grid-cols-8 gap-5 mx-auto">
    //         <div className={'col-span-4 flex flex-col items-center justify-start gap-8'}>
    //             <AllImages />
    //             <Separator />
    //             <footer className={'flex items-center justify-between w-full'}>
    //                 <div className={'flex items-end gap-1'}>
    //                     <span className="title-font font-medium text-2xl">
    //                         $58.00
    //                     </span>
    //                     <span className={'text-sm line-through'}>
    //                         $88.05
    //                     </span>
    //                 </div>
    //                 <div className={'flex items-center gap-2'}>
    //                     <Button className={'gap-2'}>
    //                         <MdOutlineAddShoppingCart className={'text-lg'} />
    //                         Add To Cart
    //                     </Button>
    //                     <WishlistButton />
    //                 </div>
    //             </footer>
    //         </div>
    //         <div className={'col-span-4 p-5 flex flex-col justify-start gap-8'}>
    //             <header className={'flex flex-col gap-2'}>
    //                 <h2 className="text-sm uppercase title-font text-gray-500 tracking-widest">
    //                     BRAND NAME yesfdsvfffdsf
    //                 </h2>
    //                 <h1 className="text-3xl title-font font-medium">
    //                     The Catcher in theb
    //                 </h1>
    //             </header>
    //             <div className={'flex flex-col justify-between gap-8'}>
    //                 <p className="leading-relaxed">
    //                     Fam locavore kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
    //                     kickstarter distillery. Mixtape chillwave tumeric
    //                     sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
    //                     forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
    //                     listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    // </section>
    return <div className="py-6">
        <Breadcrumb className="mx-24">
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
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." className="h-full w-full object-cover object-center" />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg" alt="Model wearing plain black basic tee." className="h-full w-full object-cover object-center" />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg" alt="Model wearing plain gray basic tee." className="h-full w-full object-cover object-center" />
                </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Model wearing plain white basic tee." className="h-full w-full object-cover object-center" />
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
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-4">
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
}

const WishlistButton = () => {
    const [isHeart, setIsHeart] = React.useState(false)

    return <Toggle onPressedChange={() => setIsHeart(!isHeart)}
        className={'p-0 pt-1 rounded-full w-12 h-12 items-center justify-center'}>
        <FaHeart className={`${isHeart && `text-red-600`} w-12 text-xl`} />
    </Toggle>
}

export default Product