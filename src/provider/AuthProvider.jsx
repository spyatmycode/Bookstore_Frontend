import { createContext, useEffect, useReducer } from "react";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";
import { URL } from "../config/config";

export const AuthContext = createContext();

const authReducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };

        case "LOGOUT":
            return { user: null }
        
        case "PAYSTACK":
            return {user:{...state.user,payStackUserData:action.payload}}
        case "PROFILE":
            return {user:{...state.user,userData:action.payload}}
    }

}




const AuthProvider = ({ children }) => {

    const loggedInUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null





    const [authState, dispatch] = useReducer(authReducer, {
        user: loggedInUser
    })

    const getPayStackData = async () => {
        const getProfile = await axios.get(`${URL}/api/paystack/customer?email=${authState?.user?.email}`, {
            email: `${authState?.user?.email}`
        }, {
            headers: {
                Authorization: `Bearer ${authState?.user?.token}`
            }

        })

        const getUserData = await axios.get(`${URL}/api/users?email=${authState?.user?.email}`,{
            headers:{
                Authorization:`Bearer ${authState?.user?.token}`
            }
        })

        dispatch({type:"PAYSTACK",payload:getProfile?.data?.data})
        dispatch({type:"PROFILE",payload:getUserData?.data?.data})

    }



    useEffect(() => {

        console.log(authState);


    }, [authState]);

    useEffect(()=>{
        getPayStackData()

    },[authState?.user?.token])

    console.log("Authstate:", authState);


    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider