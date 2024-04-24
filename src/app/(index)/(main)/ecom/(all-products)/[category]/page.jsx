import React from "react";
import { ProductItem } from "../page";

const ProductsCategory = () => {
    return <div className={'grid grid-cols-4 gap-4 mx-24'}>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => {
                return <ProductItem key={index} />
            })
        }
    </div>
}

export default ProductsCategory
