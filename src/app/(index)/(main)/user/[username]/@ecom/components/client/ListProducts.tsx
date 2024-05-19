"use client"
import { StarBlank, StarFill } from '@/app/(index)/(main)/ecom/components/server/Starts'
import { Button } from '@/components/ui/button'
import { AccessToken, AuthContext, AuthContextType } from '@/context/AuthContext'
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"


interface ProductType {
    "id": string,
    "name": string,
    "price": number,
    "offer": number,
    "category": string,
    "subcategory": string,
    "image": string,
    "availibility": string,
    "rating": number,
}

const ListProducts = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken

    const [products, setProducts] = React.useState<ProductType[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        FetchAllProducts(accessToken, setProducts, setLoading)
    }, [])

    return (
        loading ? <div>Loading...</div> : products.map((item, index) => {
            return <div className='p-8 flex items-start justify-between gap-2 h-fit' key={index}>
                <div className='flex items-start gap-8 w-full'>
                    <Image src={item.image} width={100} height={100} alt={'product'} />
                    <div className='flex flex-col flex-1 gap-8 items-start w-full col-span-2 mr-4'>
                        <div className='flex-1 flex items-start justify-between'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-lg'>
                                    {item.name}
                                </h1>
                                <h2 className='text-sm'>
                                    {item.category} {'>'} {item.subcategory}
                                </h2>
                                <h3 className='text-sm'>
                                    Price: &#8377;{item.price} off {item.offer}%
                                </h3>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {
                                    item.availibility === 'instock' ? <span className='text-green-500'>In Stock</span> : <span className='text-red-500'>Out of Stock</span>
                                }
                                <div className='flex items-center gap-1'>
                                    {
                                        Array.from({ length: 5 }, (_, i) => {
                                            return i < item.rating ? <StarFill key={i} /> : <StarBlank key={i} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 justify-end w-full'>
                            <Button>
                                Edit
                            </Button>
                            <DeleteButton setProducts={setProducts} id={item.id} />
                        </div>
                    </div>
                </div>
                <Cross2Icon />
            </div>
        })
    )
}

const FetchAllProducts = async (
    accessToken: AccessToken | undefined,
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const options = {
            method: 'GET',
            url: `${process.env.BASE_API_URL}/ecom/get-all-my-products/`,
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
        }
        const response = await axios.request(options)
        setProducts(response.data)
    } catch (error: any) {
        toast.error(error.response.data.error ?? "Something went wrong!")
    } finally {
        setLoading(false)
    }
}

const DeleteButton = ({ setProducts, id }: { setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>, id: string }) => {
    const [open, setOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            <Button>
                Delete
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this product?
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    {
                        loading ? <Button disabled className="gap-2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> :
                            <Button onClick={() => handleDeleteProduct(accessToken, setLoading, id, setProducts)}>Delete</Button>
                    }
                </DialogFooter>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}

const handleDeleteProduct = async (
    accessToken: AccessToken | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    id: string,
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,

) => {
    setLoading(true)
    try {
        const options = {
            method: 'DELETE',
            url: `${process.env.BASE_API_URL}/ecom/edit-product/${id}/`,
            headers: {
                authorization: `JWT ${accessToken}`,
            }
        }
        await axios.request(options)
        setProducts((prev) => prev.filter((item) => item.id !== id))
        toast.success('Product has been deleted successfully.')
    } catch (error) {
        toast.error('Product has been failed to delete.')
    } finally {
        setLoading(false)
    }
}

export default ListProducts