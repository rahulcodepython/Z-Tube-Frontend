"use client"
import React from "react";
import {Button} from "@/components/ui/button";

const QuantityButton = ({ maxAmount }: {maxAmount: number}) => {
    const [quantity, setQuantity] = React.useState<number>(1)

    return <div className="flex items-center justify-start">
        <div className="flex items-center gap-4">
            <Button variant="outline" className="px-6 py-0" onClick={() => setQuantity(pre => pre - 1 <= 0 ? pre : pre - 1)}> - </Button>
            <span> {quantity} </span>
            <Button variant="outline" className="px-6 py-0" onClick={() => setQuantity(pre => pre + 1 > maxAmount ? pre : pre + 1)}> + </Button>
        </div>
    </div>
}

export default QuantityButton;