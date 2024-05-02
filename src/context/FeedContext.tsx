import React from "react";

interface Feed {
    id: string
    caption: string
    tags: Array<string>
    media: Array<string>
    uploader: {
        first_name: string
        last_name: string
        username: string
        image: string
        is_superuser: boolean
    }
    createdAt: string
    isPublic: boolean
    isProtected: boolean
    isPersonal: boolean
    isHidden: boolean
    isPrivate: boolean
    likeNo: number
    viewsNo: number
    share: number
    allowComments: boolean
    commentNo: number
    self: boolean;
    user_reaction: string | null;
}

interface FeedContextType {
    feed: Array<Feed> | [];
    setFeed: React.Dispatch<React.SetStateAction<Array<Feed>>>;
}

export const FeedContext = React.createContext<FeedContextType | undefined>(undefined);

interface FeedProviderProps {
    children: React.ReactNode;
}

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
    const [feed, setFeed] = React.useState<Array<Feed>>([]);

    return (
        <FeedContext.Provider value={{ feed, setFeed }}>
            {children}
        </FeedContext.Provider>
    );
};
