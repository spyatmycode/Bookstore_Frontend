import { useState } from "react";
import  useAuthContext  from "./useAuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export const useLogIn = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const { dispatch, authState } = useAuthContext();


    const login = async (email, password, username) => {


        try {
            setLoading(true);
            await axios.post("https://api-akeju-bookstore-backend.onrender.com/api/users/login", {
                email, password
            }).then((res) => {
                setLoading(false);
                dispatch({type:'LOGIN', payload:res.data})
                localStorage.setItem("user", JSON.stringify(res.data));
                toast.success("Login successful")
             
                console.log(res);

            })


        } catch (error) {
            
            setLoading(false);
            setError(error.message)
            console.log(error);
            console.log(error.message)
            toast.error(error?.response?.data?.message)


        }

    }

    return { login, error,loading }

}

