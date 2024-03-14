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
import {BiSend, IoChatbubbleOutline} from '@/data/icons/icons'
import {AuthContext} from "@/context/AuthContext";
import {Form, Formik} from "formik";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import {DateTimeParser} from "@/utils";
import axios from "axios";

const ReplyModal = ({post, setPost, comment}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const {accessToken} = React.useContext(AuthContext)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-1'>
                    <IoChatbubbleOutline className='text-sm'/>
                    <span className='text-xs'>Reply</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reply</DialogTitle>
                    <DialogDescription>
                        <Formik initialValues={{
                            comment: ''
                        }} onSubmit={async (values) => await CreateComment(accessToken, values.comment, post, comment, setLoading, setPost, setIsOpen)}>
                            {({values, handleChange, handleSubmit}) => (
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
                            )}
                        </Formik>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const CreateComment = async (accessToken, value, post, comment, setLoading, setPost, setIsOpen) => {
    setLoading(() => true)
    const options = {
        method: 'POST',
        url: `${process.env.BASE_API_URL}/feed/createcomment/${post.id}/`,
        headers: {
            Authorization: `JWT ${accessToken}`,
        },
        data: {
            comment: value,
            master: comment.id,
            createdAt: DateTimeParser(Date.now()),
        }
    };
    await axios.request(options)
        .then(response => {
            comment.children.push(response.data.comment)
            setPost({...post, commentNo: response.data.commentNo})
        })
        .finally(() => {
            setLoading(() => false)
            setIsOpen(() => false)
        })
}

export default ReplyModal