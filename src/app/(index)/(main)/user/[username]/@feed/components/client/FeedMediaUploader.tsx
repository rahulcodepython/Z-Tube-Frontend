import { BiCamera } from "react-icons/bi";
import { FiEdit, FiTrash } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Image from 'next/image'
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from '@/components/ui/button';

interface MediaUploaderProps {
    media: ImageListType
    setMedia: React.Dispatch<React.SetStateAction<ImageListType>>
    setIsMediaUpdate: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    maxNumber: number
}

const FeedMediaUploader = ({ media, setMedia, setIsMediaUpdate, maxNumber }: MediaUploaderProps) => {
    return <ImageUploading value={media} multiple onChange={(imageList, addUpdateIndex) => {
        setIsMediaUpdate?.(() => true)
        setMedia(() => imageList)
    }} maxNumber={maxNumber} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => {
            return <div className={'space-y-2'}>
                {
                    imageList.length > 0 ? <div className={'flex justify-center items-center gap-2'} {...dragProps}>
                        <Button className={'gap-2'} onClick={onImageUpload}>
                            <FiEdit />
                            Edit
                        </Button>
                        <Button className={'gap-2'} onClick={onImageRemoveAll}>
                            <FiTrash />
                            Trash
                        </Button>
                    </div> : null
                }
                {
                    imageList.length === 0 ? <div className='border-dashed border-2 p-8 flex justify-center items-center w-full h-60'
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload} {...dragProps}>
                        <div className='flex flex-col items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className='text-gray-600'>Drag {`'n'`} drop some files here, or click to select
                                files</p>
                        </div>
                    </div> : imageList.length > 1 ? <Carousel>
                        <CarouselContent>
                            {
                                imageList.map((image, index) => {
                                    return <CarouselItem key={index}>
                                        <AspectRatio ratio={16 / 9}
                                            className={'flex items-center justify-center relative group'}>
                                            <Image src={image.data_url} width={250} height={250} alt="Image"
                                                className='object-cover' />
                                            <div
                                                className={'absolute text-2xl hidden group-hover:flex gap-4 items-center justify-center transition-all duration-300 ease-in-out'}>
                                                <Button variant="outline" size="icon" className={'rounded-full'}
                                                    onClick={() => onImageUpdate(index)}>
                                                    <BiCamera className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="icon" className={'rounded-full'}
                                                    onClick={() => onImageRemove(index)}>
                                                    <AiOutlineClose className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </AspectRatio>
                                    </CarouselItem>
                                })
                            }
                        </CarouselContent>
                        <CarouselPrevious className={'ml-20'} />
                        <CarouselNext className={'mr-20'} />
                    </Carousel> : <AspectRatio ratio={16 / 9} className={'flex items-center justify-center'}>
                        <Image src={imageList[0].data_url} width={250} height={250} alt="Image"
                            className='object-cover' />
                    </AspectRatio>
                }
            </div>
        }}
    </ImageUploading>
}

export default FeedMediaUploader