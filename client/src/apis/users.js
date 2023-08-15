
import axios from "./axios";


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
        await console.log(response.data)
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
        await console.log(response.data)
        return response;

    } catch (err) {
        console.log(err)
        return err;

    }

};

export const refresh = async (data) => {

    try {
        const response = await axios.post(
            "/users/refresh",
            {
                withCredentials: true,
            }
        );
        await console.log(response.data)
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
