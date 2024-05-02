import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
    text: string
    icon: React.ReactNode
}

const CustomTooltip = ({icon, text}: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="text-xl cursor-pointer">
                        {icon}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    {text}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CustomTooltip