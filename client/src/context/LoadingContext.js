import { createContext, useState } from "react";

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [triggerUpdate, setTriggerUpdate] = useState(true);

    return (
        <LoadingContext.Provider value={ { loading, setLoading, triggerUpdate, setTriggerUpdate } }>
            { children }
        </LoadingContext.Provider>
    )

}

export default LoadingContext;