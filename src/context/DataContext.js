"use client";
import React from "react";

export const DataContext = React.createContext(undefined);

export const DataProvider = ({ children }) => {
    const [data, setData] = React.useState({});

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
}
