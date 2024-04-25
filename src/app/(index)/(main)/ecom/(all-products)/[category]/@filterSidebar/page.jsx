"use client"
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CaretSortIcon } from "@radix-ui/react-icons"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input";
import { FiFilter } from "@/data/icons/icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const FilterSidebar = () => {
    // return <div className={'bg-gray-50 dark:bg-gray-900 rounded-md'}>
    //     <div className={'font-bold text-lg px-4 py-2'}>
    //         Filter
    //     </div>
    //     <Separator />
    //     <div className={'mt-2'}>
    //         <Accordion type="single" collapsible className="w-full">
    //             <AccordionItem value="item-0">
    //                 <AccordionTrigger className={'hover:no-underline px-2'}>
    //                     Category
    //                 </AccordionTrigger>
    //                 <AccordionContent className={'px-2'}>
    //                     <FilterItem />
    //                 </AccordionContent>
    //             </AccordionItem>
    //             <AccordionItem value="item-1">
    //                 <AccordionTrigger className={'hover:no-underline px-2'}>
    //                     Pricing
    //                 </AccordionTrigger>
    //                 <AccordionContent className={'px-2'}>
    //                     <PricingMeter />
    //                 </AccordionContent>
    //             </AccordionItem>
    //             <AccordionItem value="item-2">
    //                 <AccordionTrigger className={'hover:no-underline px-2'}>
    //                     Verified
    //                 </AccordionTrigger>
    //                 <AccordionContent className={'px-2'}>
    //                     <Verification />
    //                 </AccordionContent>
    //             </AccordionItem>
    //             <AccordionItem value="item-3">
    //                 <AccordionTrigger className={'hover:no-underline px-2'}>
    //                     Ratings
    //                 </AccordionTrigger>
    //                 <AccordionContent className={'px-2'}>
    //                     <Ratings />
    //                 </AccordionContent>
    //             </AccordionItem>
    //         </Accordion>
    //     </div>
    // </div>
    return <div className="py-4 px-8 flex items-center justify-between gap-4">
        <div className="flex-1">
            <Input placeholder="Search..." className="focus-visible:ring-0 focus-visible:ring-ring border-t-0 border-r-0 border-l-0 border-b rounded-none" />
        </div>
        <Dialog>
            <DialogTrigger className="flex items-center px-4 gap-2 cursor-pointer hover:bg-secondary p-2 rounded-md">
                <FiFilter />
                <span>Filter</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Filter
                    </DialogTitle>
                    <DialogDescription>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-0">
                                <AccordionTrigger className={'hover:no-underline px-2'}>
                                    Category
                                </AccordionTrigger>
                                <AccordionContent className={'px-2'}>
                                    <FilterItem />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className={'hover:no-underline px-2'}>
                                    Pricing
                                </AccordionTrigger>
                                <AccordionContent className={'px-2'}>
                                    <PricingMeter />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className={'hover:no-underline px-2'}>
                                    Ratings
                                </AccordionTrigger>
                                <AccordionContent className={'px-2'}>
                                    <Ratings />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
}

const FilterItem = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(null)

    const frameworks = [
        {
            value: "next.js",
            label: "Next.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
    ]

    return (
        <Popover open={open} onOpenChange={() => setOpen(() => !open)}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open}
                    className="w-full justify-between focus-visible:ring-0">
                    {
                        value || "Select Your Filter"
                    }
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Type..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {
                                frameworks.map((item, index) => {
                                    return <CommandItem
                                        key={index}
                                        keywords={[item.value]}
                                        className={'cursor-pointer data-[disabled]:pointer-events-auto'}
                                        onSelect={() => {
                                            setValue(() => item.value)
                                            setOpen(() => false)
                                        }}>
                                        {item.label}
                                    </CommandItem>
                                })
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

const Ratings = () => {
    return <div className={'flex flex-col gap-4 px-2'}>
        <div className="flex items-center space-x-2">
            <Checkbox id="rating-4" onCheckedChange={e => {
                console.log(e)
            }} className={'focus-visible:ring-0'} />
            <label htmlFor="terms"
                className="text-sm opacity-50 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                4 & Above
            </label>
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox id="rating-3" onCheckedChange={e => {
                console.log(e)
            }} className={'focus-visible:ring-0'} />
            <label htmlFor="terms"
                className="text-sm opacity-50 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                3 & Above
            </label>
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox id="rating-2" onCheckedChange={e => {
                console.log(e)
            }} className={'focus-visible:ring-0'} />
            <label htmlFor="terms"
                className="text-sm opacity-50 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                2 & Above
            </label>
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox id="rating-1" onCheckedChange={e => {
                console.log(e)
            }} className={'focus-visible:ring-0'} />
            <label htmlFor="terms"
                className="text-sm opacity-50 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                1 & Above
            </label>
        </div>
    </div>
}

const PricingMeter = () => {
    const [value, setValue] = React.useState(100)

    return <div>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={'w-full'}>
                    <Slider defaultValue={[value]} min={0} max={100} step={1} onValueChange={e => setValue(() => e)}
                        onValueCommit={e => console.log(e, "After Commit")} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        {value}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
}

export default FilterSidebar