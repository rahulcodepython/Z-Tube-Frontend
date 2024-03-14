"use client"
import React from 'react'
import {Form, Formik} from "formik";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ReloadIcon} from "@radix-ui/react-icons";
import {BiSend} from "@/data/icons/icons";
import {DateTimeParser} from "@/utils";
import axios from "axios";
import {AuthContext} from "@/context/AuthContext";

const ReplyForm = ({post, setPost, comment}) => {
    const [loading, setLoading] = React.useState(false)

    const {accessToken} = React.useContext(AuthContext)

    return <Formik initialValues={{
        comment: ''
    }} onSubmit={async (values) => await CreateComment(accessToken, values.comment, post, comment, setLoading, setPost)}>
        {({values, handleChange, handleSubmit}) => (
            <Form className='flex flex-col gap-2 pt-4'>
                <Textarea placeholder="Add a comment..." rows="3" name={'comment'} value={values.comment}
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
                            <span>
                        Submit
                    </span>
                        </Button>
                }
            </Form>
        )}
    </Formik>
}

const CreateComment = async (accessToken, value, post, comment, setLoading, setPost) => {
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
        .finally(() => setLoading(() => false))
}

export default ReplyForm