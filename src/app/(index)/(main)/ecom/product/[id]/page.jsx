"use client"
import React from "react";
import Image from "next/image";
import {Separator} from "@/components/ui/separator"
import {Button} from "@/components/ui/button";
import {MdOutlineAddShoppingCart, FaHeart} from "@/data/icons/icons"
import {Toggle} from "@/components/ui/toggle";
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
import {AspectRatio} from "@/components/ui/aspect-ratio"

const ProductSingle = () => {
    return <section className="text-gray-600 body-font overflow-hidden container py-8">
        <div className="grid grid-cols-8 gap-5 mx-auto">
            <div className={'col-span-4 flex flex-col items-center justify-start gap-8'}>
                <AllImages/>
                <Separator/>
                <footer className={'flex items-center justify-between w-full'}>
                    <div className={'flex items-end gap-1'}>
                        <span className="title-font font-medium text-2xl">
                            $58.00
                        </span>
                        <span className={'text-sm line-through'}>
                            $88.05
                        </span>
                    </div>
                    <div className={'flex items-center gap-2'}>
                        <Button className={'gap-2'}>
                            <MdOutlineAddShoppingCart className={'text-lg'}/>
                            Add To Cart
                        </Button>
                        <WishlistButton/>
                    </div>
                </footer>
            </div>
            <div className={'col-span-4 p-5 flex flex-col justify-start gap-8'}>
                <header className={'flex flex-col gap-2'}>
                    <h2 className="text-sm uppercase title-font text-gray-500 tracking-widest">
                        BRAND NAME yesfdsvfffdsf
                    </h2>
                    <h1 className="text-3xl title-font font-medium">
                        The Catcher in theb
                    </h1>
                </header>
                <div className={'flex flex-col justify-between gap-8'}>
                    <p className="leading-relaxed">
                        Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.Fam locavore
                        kickstarter distillery. Mixtape chillwave tumeric
                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim
                        forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin
                        listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
                    </p>
                </div>
            </div>
        </div>
    </section>
}

const AllImages = () => {
    const [image, setImage] = React.useState('/image/demo.png')
    return <div className={'flex flex-row-reverse gap-4 h-[400px]'}>
        <Dialog>
            <DialogTrigger>
                <Image alt="ecommerce" className="object-cover object-center rounded-md"
                       src={image}
                       width={400} height={400}/>
            </DialogTrigger>
            <ImageDialogContent/>
        </Dialog>
        <div className={'flex flex-col items-center justify-between'}>
            <Image alt="ecommerce" className="object-cover object-center rounded-md cursor-pointer"
                   src="/image/demo.png"
                   width={90} height={70} onClick={() => setImage('/image/demo.png')}/>
            <Image alt="ecommerce" className="object-cover object-center rounded-md cursor-pointer"
                   src="/image/demo.png"
                   width={90} height={70} onClick={() => setImage('/image/demo.png')}/>
            <Image alt="ecommerce" className="object-cover object-center rounded-md cursor-pointer"
                   src="/image/image.png"
                   width={90} height={70} onClick={() => setImage('/image/image.png')}/>
            <Image alt="ecommerce" className="object-cover object-center rounded-md cursor-pointer"
                   src="/image/demo.png"
                   width={90} height={70} onClick={() => setImage('/image/demo.png')}/>
        </div>
    </div>
}

const WishlistButton = () => {
    const [isHeart, setIsHeart] = React.useState(false)

    return <Toggle onPressedChange={() => setIsHeart(!isHeart)}
                   className={'p-0 pt-1 rounded-full w-9 items-center justify-center'}>
        <FaHeart className={isHeart && `text-red-600`}/>
    </Toggle>
}

const ImageDialogContent = () => {
    return <DialogContent className={'max-w-xl'}>
        <DialogHeader>
            <DialogDescription className={'flex items-center justify-center'}>
                <AllImagesMoal/>
            </DialogDescription>
        </DialogHeader>
    </DialogContent>
}

const AllImagesMoal = () => {
    return <Carousel className="w-full max-w-xs">
        <CarouselContent>
            <CarouselItem>
                <AspectRatio ratio={1} className="bg-muted rounded-md">
                    <Image
                        src="/image/image.png"
                        alt="Photo by Drew Beamer"
                        fill
                        className="rounded-md object-cover"
                    />
                </AspectRatio>
            </CarouselItem>
            <CarouselItem>
                <AspectRatio ratio={1} className="bg-muted rounded-md">
                    <Image
                        src="/image/demo.png"
                        alt="Photo by Drew Beamer"
                        fill
                        className="rounded-md object-cover"
                    />
                </AspectRatio>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
    </Carousel>
}
export default ProductSingle