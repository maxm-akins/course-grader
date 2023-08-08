
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


const searchSchools = async (q) => {

    if (q === "") return [];

    try {
        const response = await axios.get(
            `/data/schools/search/${q}`,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        await console.log(response.data)
        return await response.data;

    } catch (err) {
        console.log(err)
        return err;

    }

};


const useSchoolsApi = () => {
    return searchSchools;
}

export default useSchoolsApi;
