import { createContext, useState } from "react";

const ResponseContext = createContext({});

export const ResponseProvider = ({ children }) => {
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [success, setSuccess] = useState(false);
    const [success2, setSuccess2] = useState(false);
    const [err, setErr] = useState(false);


    return (
        <ResponseContext.Provider value={ { err, setErr, showError, setShowError, success, setSuccess, showSuccess, setShowSuccess, success2, setSuccess2 } }>
            { children }
        </ResponseContext.Provider>
    )

}

export default ResponseContext;