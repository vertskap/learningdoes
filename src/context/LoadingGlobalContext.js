"use client";

import { createContext, useContext, useState } from "react";

const LoadingGlobalContext = createContext({
    loading: false,
    setLoading: () => { },
});

export function useLoadingLoader() {
    return useContext(LoadingGlobalContext);
}

export function LoadingGlobalProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingGlobalContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingGlobalContext.Provider>
    );
}