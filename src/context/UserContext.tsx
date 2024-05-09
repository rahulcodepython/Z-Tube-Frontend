"use client"
import React from 'react'

export interface UserContextType {
    isError: boolean
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
    parentLoading: boolean
    setParentLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
    const [parentLoading, setParentLoading] = React.useState<boolean>(true);
    const [isError, setIsError] = React.useState<boolean>(false);

    return <UserContext.Provider value={{
        isError, setIsError, parentLoading, setParentLoading
    }}>
        {children}
    </UserContext.Provider>
}