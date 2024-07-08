"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, Formik } from 'formik'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import FeedMediaUploader from '@/app/(index)/(main)/user/[username]/@feed/components/client/FeedMediaUploader';
import { ImageListType } from 'react-images-uploading'
import { AccessToken, AuthContext, AuthContextType } from '@/context/AuthContext'
import { UploadMediaFiles } from '@/utils'
import { toast } from 'react-toastify'
import Data from '@/data/data'

interface ProductType {
    name: string
    description: string
    price: number
    offer: number
    category: string
    subcategory: string
    quantity: number
    availibile_quantity: number
    availibility: string
}

const CreateProduct = () => {
    const authContext = React.useContext<AuthContextType | undefined>(AuthContext)
    const accessToken = authContext?.accessToken

    const [uploading, setUploading] = React.useState<boolean>(false)
    const [media, setMedia] = React.useState<ImageListType>([])

    return (
        <div className='py-12'>
            <div className='font-bold text-xl'>
                Create New Post
            </div>
            <Formik initialValues={{
                name: '',
                description: '',
                price: 0,
                offer: 0,
                category: '',
                subcategory: '',
                availibile_quantity: 0,
                quantity: 0,
                availibility: 'instock'
            }} onSubmit={
                async (values, actions) => {
                    await CreateProductPost(accessToken, values, media, setMedia, setUploading)
                    actions.resetForm()
                }}>
                {({ values, handleChange, handleSubmit, setFieldValue }) => {
                    return <Form className='flex flex-col gap-8 pt-12' onSubmit={e => e.preventDefault()}>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-name">Product Name</Label>
                            <Input placeholder='Product Name' value={values.name} onChange={e => handleChange(e)} name="name" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-description">Product Desciption</Label>
                            <Textarea placeholder='Write the description of the product' value={values.description} onChange={e => handleChange(e)} name="description" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-price">Product Price</Label>
                            <Input type="number" placeholder='Product Number' value={values.price} onChange={e => handleChange(e)} name="price" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-offer">Product Price Offer</Label>
                            <Input type="number" placeholder='Product Offer' value={values.offer} onChange={e => handleChange(e)} name="offer" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-category">Product Category</Label>
                            <Select name='category' defaultValue={values.category} onValueChange={e => {
                                let value = { target: { type: "select", value: e, name: 'category' } }
                                handleChange(value);
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Data.ecom.productCategory.map((item, index) => {
                                            return <SelectItem key={index} value={item.key}>{item.title}</SelectItem>
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-subcategory">Product Subcategory</Label>
                            <Select name='subcategory' defaultValue={values.subcategory} onValueChange={e => {
                                let value = { target: { type: "select", value: e, name: 'subcategory' } }
                                handleChange(value)
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Subcategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Data.ecom.productSubCategory.map((item, index) => {
                                            return <SelectItem key={index} value={item.key}>{item.title}</SelectItem>
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-quantity">Product Quantity</Label>
                            <Input type="number" placeholder='Product Quantity' value={values.quantity} onChange={e => {
                                handleChange(e)
                                Number(e.target.value) < values.availibile_quantity && setFieldValue('availibile_quantity', Number(e.target.value))
                            }} name="quantity" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="availibile-quantity">Product Available Quantity</Label>
                            <Input type="number" placeholder='Product Available Quantity' value={values.availibile_quantity} onChange={e => Number(e.target.value) <= values.quantity && handleChange(e)} name="availibile_quantity" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-availibility">Product Availability</Label>
                            <RadioGroup defaultValue={values.availibility} onChange={e => handleChange(e)} name="availibility">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="instock" id="instock" />
                                    <Label htmlFor="instock">InStock</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="outofstock" id="outofstock" />
                                    <Label htmlFor="outofstock">Out of Stock</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-image">Product Image</Label>
                            <FeedMediaUploader media={media} setMedia={setMedia} setIsMediaUpdate={undefined} maxNumber={4} />
                        </div>
                        {
                            uploading ? <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button> : <Button type="submit" onClick={() => handleSubmit()}>Create Product</Button>
                        }
                    </Form>
                }}
            </Formik>
        </div>
    )
}

const CreateProductPost = async (
    accessToken: AccessToken | undefined,
    values: ProductType,
    media: ImageListType,
    setMedia: React.Dispatch<React.SetStateAction<ImageListType>>,
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    setUploading(true)
    try {
        const mediaURL: string[] = []

        await Promise.all(media.map(async (item: any) => {
            const url = await UploadMediaFiles(item.file, `ECommerce/${item.file.name}`);
            mediaURL.push(url);
        }));

        const options = {
            method: 'POST',
            url: `${process.env.BASE_API_URL}/ecom/create-product/`,
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
            data: {
                ...values,
                images: mediaURL
            }
        }

        await axios.request(options)
        toast.success('Product Created Successfully');
    } catch (error: any) {
        toast.error(error?.response?.data?.error ?? 'Something went wrong')
    } finally {
        setMedia([])
        setUploading(false)
    }
}

export default CreateProduct