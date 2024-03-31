import React from "react";
import ProductItem from "@/app/(index)/(main)/ecom/(layout)/components/server/ProductItem";

const page = ()=> {
    return <div className={'flex gap-2 flex-wrap w-full col-span-5'}>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => {
                return <ProductItem key={index}/>
            })
        }
    </div>
}

export default page