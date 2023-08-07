
import { useState } from "react";
import axios from "./axios";


const getSchools = async () => {

    try {
        const response = await axios.get(
            "/data/schools",
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        await console.log(response.data)
        return response.data;

    } catch (err) {
        console.log(err)
        return err;

    }

};


const useSchoolsApi = () => {
    return getSchools;
}

export default useSchoolsApi;
