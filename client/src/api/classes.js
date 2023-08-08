
import { useState } from "react";
import axios from "./axios";



export const searchClasses = async (school, q) => {

    if (q === "") return [];

    try {
        const response = await axios.get(
            `/data/classes/search/${school}/${q}`,
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


export const getClass = async (q) => {

    if (q === "") return "";

    try {
        const response = await axios.get(
            `/data/classes/${q}`,
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




const useClassesApi = () => {
    return searchClasses;
}

export default useClassesApi;
