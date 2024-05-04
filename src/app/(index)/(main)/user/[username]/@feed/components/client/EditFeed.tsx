"use client"
import React, {useContext} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from "@/components/ui/textarea"
import {Label} from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {AccessToken, AuthContext, AuthContextType} from '@/context/AuthContext';
import {ReloadIcon} from "@radix-ui/react-icons"
import {UploadMediaFiles} from '@/utils';
import axios from 'axios';
import {toast} from 'react-toastify';
import {Form, Formik, FieldArray, FormikValues} from "formik";
import {Checkbox} from "@/components/ui/checkbox"
import TagsInput from "@/components/TagsInput";
import {FeedContext, FeedContextType, FeedType} from '@/context/FeedContext';
import {BiSend} from "react-icons/bi";
import {ImageListType} from "react-images-uploading";
import {MediaUploader} from "@/app/(index)/(main)/user/[username]/@feed/components/client/CreateFeed";

interface EditFeedProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    feed: FeedType | undefined
    feedIndex: number,
}

const EditFeed = ({setIsOpen, feed, feedIndex}: EditFeedProps) => {
    const authContext = useContext<AuthContextType | undefined>(AuthContext)
    const feedContext = useContext<FeedContextType | undefined>(FeedContext)

    const accessToken = authContext?.accessToken
    const setFeed = feedContext?.setFeed

    const [uploading, setUploading] = React.useState<boolean>(false)
    const [isMediaUpdate, setIsMediaUpdate] = React.useState<boolean>(false)
    const [media, setMedia] = React.useState<ImageListType>(
        feed ? feed.media.map(item => {
            return {
                data_url: item
            }
        }) : [{data_url: ''}]
    )

    return (
        <Formik initialValues={{
            caption: feed?.caption,
            visibility: feed?.isPublic ? 'public' : feed?.isProtected ? 'protected' : feed?.isPrivate ? 'private' : 'public',
            tags: feed?.tags,
            allowComments: feed?.allowComments
        }} onSubmit={
            async values => await EditFeedPost(setUploading, accessToken, media, values, setIsOpen, feed, feedIndex, isMediaUpdate, setFeed)
        }>
            {({values, handleChange, handleSubmit}) => (
                <Form onKeyDown={e => {
                    e.key === 'Enter' ? e.preventDefault() : null;
                }}
                      onSubmit={e => e.preventDefault()}
                      className='pt-8 flex flex-col gap-4'>

                    <h6 className="text-gray-400 text-lg font-bold uppercase">
                        Post Details
                    </h6>
                    <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[50vh]">
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="caption" className="uppercase text-gray-600 text-xs">Caption</Label>
                            <Textarea placeholder="Type your caption." rows={7} name="caption" value={values.caption}
                                      onChange={handleChange} autoFocus
                                      autoComplete="email" required/>
                        </div>
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="visibility" className="uppercase text-gray-600 text-xs">Visibility</Label>
                            <Select onValueChange={(e) => handleChange(e)}
                                    defaultValue={values.visibility}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a visibility"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Visibility</SelectLabel>
                                        <SelectItem value="public">Everyone</SelectItem>
                                        <SelectItem value="protected">Connections</SelectItem>
                                        <SelectItem value="private">Only Me</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-2 w-full flex justify-center gap-1 px-1 space-x-2">
                            <Checkbox id="allowComments" checked={values.allowComments} name={'allowComments'}
                                      onCheckedChange={e => handleChange({
                                          target: {
                                              type: "checkbox",
                                              checked: e,
                                              name: 'allowComments'
                                          }
                                      })}/>
                            <label htmlFor="allowComments"
                                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Allow Comments
                            </label>
                        </div>
                        <div className="col-span-2 w-full flex flex-col gap-2 px-1">
                            <Label htmlFor="tags" className="uppercase text-gray-600 text-xs">Tags</Label>
                            <FieldArray name={'tags'}>
                                {
                                    ({remove, push}) => {
                                        return <TagsInput max={3} remove={remove} push={push} tags={values.tags}/>
                                    }
                                }

                            </FieldArray>
                        </div>
                        <div className="col-span-2 grid w-full gap-2 px-1">
                            <Label htmlFor="Media" className="uppercase text-gray-600 text-xs">Media</Label>
                            <MediaUploader media={media} setMedia={setMedia} setIsMediaUpdate={setIsMediaUpdate}/>
                        </div>
                    </div>
                    {
                        uploading ? <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                Please wait
                            </Button>
                            : <Button type='submit' className={'gap-2'}
                                      onClick={() => handleSubmit}>
                                <BiSend className='text-base'/>
                                <span>
                                    Upload
                                </span>
                            </Button>
                    }
                </Form>
            )}
        </Formik>
    );
};

const EditFeedPost = async (
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
    accessToken: AccessToken | undefined,
    media: ImageListType,
    values: FormikValues,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    feed: FeedType | undefined,
    feedIndex: number,
    isMediaUpdate: boolean,
    setFeed: ((value: (((prevState: Array<FeedType>) => Array<FeedType>) | Array<FeedType>)) => void) | undefined
) => {
    if (media.length > 0) {
        setUploading(() => true)

        try {
            let mediaURL = isMediaUpdate ? [] : feed?.media;

            mediaURL && isMediaUpdate ? await Promise.all(media.map(async (item) => {
                const url = await UploadMediaFiles(item.file, `Feed/${item?.file?.name}`);
                mediaURL.push(url);
            })) : null;


            const options = {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                },
                url: `${process.env.BASE_API_URL}/feed/editpost/${feed?.id}/`,
                method: 'PATCH',
                data: {
                    ...values,
                    ...{
                        media: mediaURL,
                    }
                }
            }

            const response = await axios.request(options)
            setFeed && setFeed(pre => {
                let newData = [...pre];
                newData[feedIndex] = response.data;
                return newData;
            })
        } catch (error) {

        }
        setIsOpen(() => false);
        setUploading(() => false);

    } else {
        toast.warn("You can not upload without any media file.")
    }
}

export default EditFeed