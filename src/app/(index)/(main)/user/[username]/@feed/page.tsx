"use client"
import React, {useContext} from 'react'
import {AccessToken, AuthContext, AuthContextType} from '@/context/AuthContext'
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import {FeedContext, FeedContextType, FeedType} from '@/context/FeedContext';
import Loading from "@/components/Loading";
import PostCard from "@/app/(index)/(main)/user/[username]/@feed/components/client/PostCard";

interface PaginationType{
    count: number
    nextUrl: string | null
}

const Feed = ({ params }: {params: {username: string}}) => {
    const authContext = useContext<AuthContextType | undefined>(AuthContext)
    const feedContext = useContext<FeedContextType | undefined>(FeedContext)

    const accessToken = authContext?.accessToken
    const feed = feedContext?.feed
    const setFeed = feedContext?.setFeed

    const [loading, setLoading] = React.useState<boolean>(true)
    const [pagination, setPagination] = React.useState<PaginationType>({
        count: 0,
        nextUrl: null,
    })

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(accessToken, params.username, setFeed, setLoading, setPagination);
        }
        handler();
    }, [])

    return loading ? <Loading /> : feed && feed.length === 0 ? <div>No Post There</div> : <InfiniteScroll dataLength={feed?.length ?? 0} next={() => FetchNextFeedPost(accessToken, pagination.nextUrl, setFeed, setPagination)} hasMore={feed ? feed.length !== pagination.count : false} loader={<h4>Loading...</h4>}>
        <div className='grid grid-cols-1 gap-4 px-60'>
            {
                feed && feed.map((item, index) => {
                    return <PostCard key={index} feed={item} feedIndex={index} />
                })
            }
        </div>
    </InfiniteScroll>
}

const FetchFeedPost = async (accessToken: AccessToken | undefined, username: string, setFeed: ((value: (((prevState: Array<FeedType>) => Array<FeedType>) | Array<FeedType>)) => void) | undefined, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setPagination: React.Dispatch<React.SetStateAction<PaginationType>>) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/`, method: 'GET',
    };

    await axios.request(options).then(response => {
        if (response.status === 200) {
            setFeed && setFeed(response.data.results)
            setPagination({
                count: response.data.count,
                nextUrl: response.data.next ?? null,
            })
        } else if (response.status === 204) {
            setFeed && setFeed([])
        }
    }).finally(() => setLoading(false))
}

const FetchNextFeedPost = async (accessToken: AccessToken | undefined, url: string | null, setFeed: ((value: (((prevState: Array<FeedType>) => Array<FeedType>) | Array<FeedType>)) => void) | undefined, setPagination: React.Dispatch<React.SetStateAction<PaginationType>>) => {
    if (url === null) return;

    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: url, method: 'GET',
    };

    await axios.request(options).then(response => {
        setFeed && setFeed((pre) => {
            if (pre) {
                return [
                    ...pre,
                    ...response.data.results
                ]
            }else{
                return []
            }
        })
        setPagination({
            count: response.data.count,
            nextUrl: response.data.next ?? null,
        })
    })
}

export default Feed