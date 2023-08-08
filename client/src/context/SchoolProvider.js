import { createContext, useState } from "react";

const SchoolContext = createContext({});

export const SchoolProvider = ({ children }) => {
    const [school, setSchool] = useState({});
    const [course, setCourse] = useState({});

    return (
        <SchoolContext.Provider value={ { school, setSchool, course, setCourse } }>
            { children }
        </SchoolContext.Provider>
    )

}

export default SchoolContext;