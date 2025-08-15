import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";


export const PrivateRoutes = ({children})=>{
    const {user , loading} = useAuth();
    if (loading) return <div>Loading..</div> 
    return  user ? children : <Navigate to="/login"/>
};