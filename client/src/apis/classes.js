
import { useState } from "react";
import axios from "./axios";



export const searchClasses = async (school, q) => {

    if (q === "") return [];

    try {
        const response = await axios.get(
            `/classes/search/${school}/${q}`,
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
            `/classes/${q}`,
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

export const postClass = async (data) => {


    try {
        const response = await axios.post(
            `/classes/add`,
            JSON.stringify(data),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        await console.log(response.data)
        return await response;

    } catch (err) {
        console.log(err)
        return err;

    }

};




const useClassesApi = () => {
    return searchClasses;
}

export default useClassesApi;
