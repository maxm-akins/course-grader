
import axios from "./axios";
// import useAxioPrivate from "@/hooks/useAxiosPrivate";
import { useAxioPrivate } from "./axios";


export const register = async (data) => {

    try {
        const response = await axios.post(
            "/users/register",
            JSON.stringify(data),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response;

    } catch (err) {
        console.log(err)
        return err;

    }

};


export const login = async (data) => {

    try {
        const response = await axios.post(
            "/users/login",
            JSON.stringify(data),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response;

    } catch (err) {
        console.log(err)
        return err;

    }

};

export const refresh = async () => {

    try {
        const response = await axios.get(
            "/users/refresh",
            {
                withCredentials: true,
            }
        );
        return response;

    } catch (err) {
        console.log(err)
        return err;

    }

};

export const getUser = async (auth) => {
    const axiosPrivate = useAxioPrivate(auth);

    try {
        const res = await axiosPrivate.get(
            "/users/getUser",
            {
                withCredentials: true,
            }
        );

        if (res?.config?.sent === true) {
            return { res, toggleAuth: true }
        }

        return res;

    } catch (err) {
        console.log(err)
        return err;

    }

};

export const logout = async () => {
    try {
        const response = await axios.get(
            "/users/logout",
            {
                withCredentials: true,
            }
        );

        return response;

    } catch (err) {
        console.log(err)
        return err;

    }

};








const useUsersApi = () => {
    return register;
}

export default useUsersApi;
