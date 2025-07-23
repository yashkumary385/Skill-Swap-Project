import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
import axios from "axios"



export const useAuth  =()=> useContext(AuthContext)


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [token , setToken] = useState(()=>localStorage.getItem("token") || null)


    const login = async (email , password) => {


        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", {
                email,
                password
            })
            console.log(res);
            const { token, user } = res.data
            setUser(user)
            setToken(token)
            localStorage.setItem("token", token)
            return {success : true}
        } catch (error) {
            console.log(error)
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


useEffect(()=>{ // this runs an autoloads if the token is present in localstorage . 
const fetchUser = async ()=>{
    try {

    if(!token){
        setUser(null)
        console.log("no token")
        return
    }
    const res = await axios.get("http://localhost:8000/users/current-user",{ // to get the profile i need to out get request .
          headers: {
            Authorization: `Bearer ${token}`,
          },
    })
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
return (

    <AuthContext.Provider value={{login , user , setUser , logout ,loading,token}}>
        {children}
        </AuthContext.Provider>
)
}