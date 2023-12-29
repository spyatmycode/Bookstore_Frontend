import toast from "react-hot-toast";
import  useAuthContext  from "./useAuthContext"
import useDataContext from "./useDataContext";

export const useLogout = ()=>{

    const {dispatch} = useAuthContext();
    const {setData} = useDataContext()

    const logout = async()=>{
        if(!localStorage.getItem("user")){
            toast.error("Already logged out");
            return;
        }
        localStorage.removeItem("user")
        setData(null)

        dispatch({type:"LOGOUT"});

        toast.success("Logout successful")
    }


    return {logout}
}