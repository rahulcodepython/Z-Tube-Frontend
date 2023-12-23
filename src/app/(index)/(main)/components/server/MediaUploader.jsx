import Image from 'next/image'
import React from 'react'

const MediaUploader = ({ formData, setFormData, media, setMedia }) => {

    const onUpload = (e) => {
        console.log(e.target.files);
        Array.from(e.target.files).map((f) => {
            if (f.type.includes('image/')) {
                // setFormData({
                //     ...formData,
                //     media: {
                //         ...formData?.mdeia,
                //         image: [...formData?.media?.image, URL.createObjectURL(f)],
                //     }
                // })
                setMedia({
                    image: [...media.image, URL.createObjectURL(f)],
                    ...media
                })
            }
            else if (f.type.includes('application/pdf')) {
                //     setFormData({
                //         ...formData,
                //         media: {
                //             ...formData?.mdeia,
                //             pdf: [...formData?.media?.pdf, URL.createObjectURL(f)],
                //         }
                //     })
                setMedia({
                    pdf: [...media.pdf, URL.createObjectURL(f)],
                    ...media
                })
            }
            else if (f.type.includes('video/mp4')) {
                // setFormData({
                //     ...formData,
                //     media: {
                //         ...formData?.mdeia,
                //         video: [...formData?.media?.video, URL.createObjectURL(f)],
                //     }
                // })
                setMedia({
                    video: [...media.video, URL.createObjectURL(f)],
                    ...media
                })
            }
        })
    }

    return (
        <div className='flex flex-col gap-3'>
            <input type="file" id="files" name="files" accept='.jpg , .jpeg , .jfif , .pjpeg , .pjp, .gif, .png, .mp4, .pdf' multiple onChange={(e) => onUpload(e)} />
            {
                media.length > 0 ?
                    media.map((image, index) => {
                        <Image src={image} width={10} height={10} alt='...' key={index} />
                    })
                    : null
            }
        </div>
    )
}

export default MediaUploader