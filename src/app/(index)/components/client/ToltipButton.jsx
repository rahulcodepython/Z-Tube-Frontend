import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const ToltipButton = ({ title, desc }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <p className="text-xl cursor-pointer">{title}</p>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{desc}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ToltipButton