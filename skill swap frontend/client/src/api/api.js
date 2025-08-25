import axios from "axios";
import { getToken } from "../context/useAuth";
const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
// Swap request Api
export const getIncomingAcceptedRequest = ()=> api.get("/incoming/accepted")
export const getOutgoingAcceptedRequest = ()=> api.get("/out/accepted")


// Auth Api's
export const loginUser =(email,password) =>{
 return  api.post("/api/auth/login",{email,password})
}
export const getCurrentUser = ()=>{
return   api.get("/users/current-user")
}

// Chat Api's
export const getChat = (chatId) =>{
  return api.get(`/message/chat/${chatId}`)
}

// Discover Api's
export const getMyServices = ()=> api.get("/getUserService/users")
export const getNotMyServices = (currentPage)=>{ 
return  api.get(`/get/notUser?limit=5&page=${currentPage}`)
}
export const createService = (requesterId,  recepientId)=>{
  return api.post("/api/swap/create",{
    requesterServiceId:requesterId,
    recepientServiceId:recepientId,
    status:"pending"
  })
}

// EditProfile Api's
export const editProfile = (formData) =>{
return api.put("/updateUser",formData,{
  headers:{"Content-Type" : "multipart/form-data",

  },
})
}

export const deleteSkill = (skillDelete)=>{
  console.log(skillDelete)
  return api.delete(`/deleteSkill/${skillDelete}`)
}
export const deleteLearn = (learnDelete)=>{
  console.log(learnDelete)

  return api.delete(`/deleteLearn/${learnDelete}`)
}

// Login page 
export const forgotPassword = (email,newpassword,confirmpassword)=>{
  return api.patch("/resetPassword",{
          email:email,
          password:newpassword,
          password1:confirmpassword
  })
}

// profile  wrapper
export const userProfile = (id)=>{
  return api.get(`/get/other/${id}`)
}


// service api's
export const fetchMyServices = ()=>{
  return api.get("/getUserService/users")
}
export default api;