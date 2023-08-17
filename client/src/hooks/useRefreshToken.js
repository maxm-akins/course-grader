"use client"

import AuthContext from "@/context/AuthProvider";
import { useContext } from "react";
import axios from "../apis/axios";
import { refresh as callRefresh } from "@/apis/users";

const useRefreshToken = () => {
    const { setAuth } = useContext(AuthContext);

    const refresh = async () => {
        try {
            const response = await callRefresh();
            setAuth(response?.data?.data);
            return response?.data?.accessToken;
        }
        catch (err) {
            console.log(err);
        }

    }
    return refresh;
}

export default useRefreshToken;