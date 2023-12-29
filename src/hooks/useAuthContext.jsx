import { AuthContext } from "../provider/AuthProvider";

import { useContext } from "react";


const useAuthContext = ()=>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error("useAuthContext must be used within the AuthProvider");
    }

    return context
}

export default useAuthContext