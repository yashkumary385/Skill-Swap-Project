import {  useEffect, useState } from "react";
import { toast } from "react-toastify";
import { joinUserRoom } from "../Socket";
import { getCurrentUser, loginUser } from "../api/api";
import { AuthContext } from "./AuthContext";



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [token , setToken] = useState(()=>localStorage.getItem("token") || null)

    const login = async(email , password) => {
        try {
           const res = await loginUser(email,password)
            console.log(res);
            const { token, user } = res.data
            setUser(user)
            setToken(token)
            localStorage.setItem("token", token)
            return {success : true}
        } catch (error) {
            console.log(error)
             if (error.response?.data) {
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong");
        }
            return {
                success: false,
                error: error.res?.data?.message || "Login failed",
            };
        }
    }


    const logout = ()=>{
        localStorage.removeItem("token")
        setUser(null)
        setToken(null);
           // setToken("")
}
useEffect(()=>{
    if(user?._id){
    joinUserRoom(user._id)
    }

},[user])

useEffect(()=>{ // this runs an autoloads if the token is present in localstorage . 
const fetchUser = async ()=>{
    try {

    if(!token){
        setUser(null)
        console.log("no token")
        return
    }
    const res = await getCurrentUser()// to get the profile i need to out get request .

    console.log(res);

    setUser(res.data)

    return {success :true}
    } catch (error) {
          console.error("Token invalid or expired",error);
          logout();
    }
    finally{
    setLoading(false)
    }
   
}
fetchUser()
},[token])//token is null or empty for a moment — even if it exists in localStorage.

// useEffect(()=>{
//     console.log(user);
// },[user])
return (

    <AuthContext.Provider value={{login , user , setUser , logout ,loading,token}}>
        {children}
        </AuthContext.Provider>
)
}


