"use client";
import React from "react";

export const ProfileContext = React.createContext(undefined);

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = React.useState(null);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}
