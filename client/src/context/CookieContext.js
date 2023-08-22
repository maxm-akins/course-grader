import { createContext, useState } from "react";

const CookieContext = createContext({});

export const CookieProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <CookieContext.Provider value={ { auth, setAuth } }>
            { children }
        </CookieContext.Provider>
    )

}

export default CookieContext;