"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {BiSend, FiEdit} from '@/data/icons/icons'
import {AuthContext} from "@/context/AuthContext";
import {Form, Formik} from "formik";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import axios from "axios";

const EditCommentModal = ({comment, setComment}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const {accessToken} = React.useContext(AuthContext)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <FiEdit className='text-sm'/>
                    <span className='text-xs'>Edit</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reply</DialogTitle>
                    <DialogDescription>
                        <Formik initialValues={{
                            comment: comment.comment
                        }}
                                onSubmit={async values => await EditComment(accessToken, values.comment, comment, setComment, setLoading, setIsOpen)}>
                            {
                                ({values, handleChange, handleSubmit}) => (
                                    <Form className='flex flex-col gap-2 pt-4'>
                                        <Textarea placeholder="Add a comment..." rows="3" name={'comment'}
                                                  value={values.comment}
                                                  onChange={e => handleChange(e)}
                                                  class="w-full border rounded-md p-2 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0"/>
                                        {
                                            loading ? <Button disabled>
                                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                                    Please wait
                                                </Button> :
                                                <Button
                                                    type={"submit"}
                                                    onClick={handleSubmit}>
                                                    <BiSend className='text-base'/>
                                                    <span>Submit</span>
                                                </Button>
                                        }
                                    </Form>
                                )
                            }
                        </Formik>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const EditComment = async (accessToken, value, comment, setComment, setLoading, setIsOpen) => {
    setLoading(() => true)
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/editcomment/${comment.id}/`,
        headers: {
            Authorization: `JWT ${accessToken}`,
        },
        data: {
            comment: value,
        }
    };
    await axios.request(options)
        .then(response => {
            setComment(() => response.data)
        })
        .finally(() => {
            setLoading(() => false)
            setIsOpen(() => false)
        })
}

export default EditCommentModal