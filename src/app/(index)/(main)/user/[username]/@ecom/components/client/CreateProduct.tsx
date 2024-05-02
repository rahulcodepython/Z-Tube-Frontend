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

interface ProductType{
    name: string
    description: string
    price: string
    offer: string
    category: string
    subcategory: string
    quantity: string
    availibility: string
}

const CreateProduct = () => {
    const [uploading, setUploading] = React.useState(false)

    return (
        <div>
            <div className='font-bold text-xl'>
                Create New Post
            </div>
            <Formik initialValues={{
                name: '',
                description: '',
                price: '',
                offer: '',
                category: 'light',
                subcategory: 'dark',
                quantity: '',
                availibility: 'instock'
            }} onSubmit={async (values :ProductType) => {
                await CreateProductPost(values, setUploading)
            }}>
                {({ values, handleChange, handleSubmit }) => {
                    return <Form className='flex flex-col gap-8 pt-12'>
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
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
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
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="product-quantity">Product Quantity</Label>
                            <Input type="number" placeholder='Product Quantity' value={values.quantity} onChange={e => handleChange(e)} name="quantity" />
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

const CreateProductPost = async (values: ProductType, setUploading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setUploading(true)
    console.log(values);
    setUploading(false)
}

export default CreateProduct