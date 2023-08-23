import { createContext, useState } from "react";

const SchoolContext = createContext({});

export const SchoolProvider = ({ children }) => {
    const [school, setSchool] = useState({});
    const [course, setCourse] = useState({});
    const [prof, setProf] = useState({});

    return (
        <SchoolContext.Provider value={ { school, setSchool, course, setCourse, prof, setProf } }>
            { children }
        </SchoolContext.Provider>
    )

}

export default SchoolContext;