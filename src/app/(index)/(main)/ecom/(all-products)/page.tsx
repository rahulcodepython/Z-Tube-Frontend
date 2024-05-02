import React from "react";
import ProductItem from "@/app/(index)/(main)/ecom/components/server/ProductItem";

const EComAllProducts = () => {
    return <div className={'grid grid-cols-4 gap-4 mx-24 mt-4'}>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => {
                return <ProductItem key={index} />
            })
        }
    </div>
}

export default EComAllProducts