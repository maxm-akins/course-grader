"use client"

import AuthContext from "@/context/AuthProvider";
import { useContext } from "react";
import axios from "../apis/axios";
import { Refresh as callRefresh } from "@/apis/users";

const useRefreshToken = () => {
    const { setAuth } = useContext(AuthContext);

    const refresh = async () => {
        try {
            const response = await callRefresh();
            // console.log(response);
            if (response?.response?.status === 201 || response?.status === 201) {
                // console.log(response?.data?.data);
                setAuth(response?.data?.data);
                return response?.data?.data?.accessToken;
            }
            else return null;

        }
        catch (err) {
            console.log(err);
        }

    }
    return refresh;
}

export default useRefreshToken;