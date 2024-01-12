import { useState } from "react";
import  useAuthContext  from "./useAuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../config/config";


export const useSignUp = () => {

    const {authState} = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [prompt, setPrompt] = useState("")

    const { dispatch } = useAuthContext();


    const signup = async (email, password, first_name, last_name, phone) => {




        try {
            setLoading(true);
            await axios.post(`${URL}/api/users/signup`, {
                 password, email, first_name, last_name, phone
            }).then((res) => {
                setLoading(false);
                // dispatch({type:'LOGIN', payload:res.data})
                // localStorage.setItem("user", JSON.stringify(res.data));
                toast.success("Signup successful")
                toast.success("Email verification link has been sent to your mailbox !")
                setPrompt("Please verify your email address to log in")
               

            })
        } catch (error) {
            
            setLoading(false);
            setError(error.message)
            console.log(error);
            console.log(error?.message)
            toast.error(error?.response?.data?.message)

        }

    }




    return { signup, error,loading, prompt }

}

