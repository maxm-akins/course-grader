"use client"

import axios from "axios";
import { Refresh } from "./users";

export default axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });


export const Axios = () => {


    const axiosIP = axios.create(
        {
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
            headers: { "Content-Type": "application/json" },

        });

    axiosIP.interceptors.request.use(
        async config => {
            const res = await axios.get("https://api.ipify.org/?format=json");
            config.headers['X-Originating-IP'] = res?.data?.ip;
            return config;

        }, (err) => {
            console.log(err);
            Promise.reject(err)
        }
    );

    return axiosIP;
}


export const AxioPrivate = (auth) => {


    const axiosPrivate = axios.create(
        {
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
            headers: { "Content-Type": "application/json" },
            withCredentials: true


        });

    axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${auth?.accessToken}`;
            }
            return config;

        }, (err) => Promise.reject(err)
    );


    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const res = await refresh();
                const newAccessToken = res?.data?.data?.accessToken;
                prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    );

    return axiosPrivate
}


