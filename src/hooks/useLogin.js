import { useState } from "react";
import useAuthContext from "./useAuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../config/config";

export const useLogIn = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [prompt, setPrompt] = useState("")


    const { dispatch, authState } = useAuthContext();


    const login = async (email, password, username) => {



        try {
            setLoading(true);
            const res = await axios.post(`${URL}/api/users/login`, {
                email, password
            })


            setLoading(false);

            console.log(res);

            if (res.data.message === "Please verify your email") {


                setPrompt("Please verify your email here")

                setError("Please verify your email")

                return

            }
            dispatch({ type: 'LOGIN', payload: res.data })
            localStorage.setItem("user", JSON.stringify(res.data));
            toast.success("Login successful")

            console.log(res);




        } catch (error) {

            setLoading(false);
            setError(error.message)
            console.log(error);
            console.log(error.message)
            toast.error(error?.response?.data?.message)


        }





    }

    return { login, error, loading, prompt }

}

