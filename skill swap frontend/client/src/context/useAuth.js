import { AuthContext } from "./AuthContext";
import { useContext } from "react";
export const useAuth  =()=> useContext(AuthContext)
export const getToken = () => {
  return localStorage.getItem("token");
};