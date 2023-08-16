import axios from "../apis/axios";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

const useLogout = () => {
    const { setAuth } = useContext(AuthContext);

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.get('/users/logout', {
                withCredentials: true
            });
            return response;
        }
        catch (err) {
            console.log(err);
        }


    }
    return logout;

}
export default useLogout;