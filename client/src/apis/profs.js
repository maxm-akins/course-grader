import { useState } from "react";
import axios from "./axios";



export const searchProfsBySchool = async (school, course, q) => {

    if (q === "") return [];

    try {
        const response = await axios.get(
            `/profs/search/${school}/${course}/${q}`,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return await response.data;

    } catch (err) {
        console.log(err)
        return err;

    }

};


export const searchProfs = async (school, q) => {

    if (q === "") return [];

    try {
        const response = await axios.get(
            `/profs/search/${school}/${q}`,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return await response.data;

    } catch (err) {
        console.log(err)
        return err;

    }

};



export const getProf = async (q) => {

    if (q === "") return "";

    try {
        const response = await axios.get(
            `/profs/${q}`,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return await response.data;

    } catch (err) {
        console.log(err)
        return err;

    }

};


