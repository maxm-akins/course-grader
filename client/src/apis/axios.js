import axios from "axios";
export default axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });
import { refresh } from "./users";


export const useAxioPrivate = (auth) => {
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
                const newAccessToken = await refresh();
                prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    );

    return axiosPrivate
}
