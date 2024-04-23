"use client"
import React from 'react'
import PostCard from "@/app/(index)/(main)/user/[username]/@feed/components/client/PostCard";
import { AuthContext } from '@/context/AuthContext'
import Loading from "@/app/(index)/(main)/user/[username]/@feed/components/server/loading";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FeedContext } from '@/context/FeedContext';

const Feed = ({ params }) => {
    const { accessToken } = React.useContext(AuthContext)

    const { feed, setFeed } = React.useContext(FeedContext)

    const [loading, setLoading] = React.useState(true)
    const [pagination, setPagination] = React.useState({
        count: 0,
        nextUrl: null,
    })

    React.useEffect(() => {
        const handler = async () => {
            await FetchFeedPost(accessToken, params.username, setFeed, setLoading, setPagination);
        }
        handler();
    }, [])

    return loading ? <Loading /> : feed.length === 0 ? <div>No Post There</div> : <InfiniteScroll dataLength={feed.length} next={() => FetchNextFeedPost(accessToken, pagination.nextUrl, setFeed, setPagination)} hasMore={feed.length !== pagination.count} loader={<h4>Loading...</h4>}>
        <div className='grid grid-cols-1 gap-4 px-60'>
            {
                feed.map((item, index) => {
                    return <PostCard key={index} feed={item} feedIndex={index} />
                })
            }
        </div>
    </InfiniteScroll>
}

const FetchFeedPost = async (accessToken, username, setFeed, setLoading, setPagination) => {
    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: `${process.env.BASE_API_URL}/feed/posts/${username}/`, method: 'GET',
    };

    await axios.request(options).then(response => {
        setFeed(response.data.results)
        setPagination({
            count: response.data.count,
            nextUrl: response.data.next ?? null,
        })
    }).finally(() => setLoading(false))
}

const FetchNextFeedPost = async (accessToken, url, setFeed, setPagination) => {
    if (url === null) return;

    const options = {
        headers: {
            Authorization: `JWT ${accessToken}`
        }, url: url, method: 'GET',
    };

    await axios.request(options).then(response => {
        setFeed(pre => {
            return [
                ...pre,
                ...response.data.results
            ]
        })
        setPagination({
            count: response.data.count,
            nextUrl: response.data.next ?? null,
        })
    })
}

export default Feed