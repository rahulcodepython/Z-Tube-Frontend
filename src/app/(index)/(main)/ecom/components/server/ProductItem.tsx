import {MdOutlineShoppingCart} from "react-icons/md";
import {Button} from "@/components/ui/button";
import {StarBlank, StarFill} from "@/app/(index)/(main)/ecom/components/server/Starts";
import {Link} from "next-view-transitions";
import Image from "next/image";

const ProductItem = () => {
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

export default ProductItem