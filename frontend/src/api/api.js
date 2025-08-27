import { getToken } from "../context/useAuth";
import axios from "axios"
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
// accepted request Api's
export const getIncomingAcceptedRequest = ()=> api.get("/swaps/incoming/accepted")
export const getOutgoingAcceptedRequest = ()=> api.get("/swaps/out/accepted")


// Auth Api's
export const loginUser =(email,password) =>{
 return  api.post("/auth/login",{email,password})
}
export const getCurrentUser = ()=>{
return   api.get("/users/current-user")
}

// Chat Api's
export const getChat = (chatId) =>{
  return api.get(`/chats/message/${chatId}`)
}

// Discover Api's
export const getMyServices = ()=> api.get("/services/getuserservices")

export const getNotMyServices = (currentPage)=>{ 
return  api.get(`/services/notuserservices?limit=5&page=${currentPage}`)
}


export const createSwap = (requesterId,  recepientId)=>{
  return api.post("/swaps/create",{
    requesterServiceId:requesterId,
    recepientServiceId:recepientId,
    status:"pending"
  })
}

// EditProfile Api's
export const editProfile = (formData) =>{
  console.log(formData)
return api.put("/users/update",formData,{
  headers:{"Content-Type" : "multipart/form-data",

  },
})
}

export const deleteSkill = (skillDelete)=>{
  console.log(skillDelete)
  return api.delete(`/users/${skillDelete}`)
}
export const deleteLearn = (learnDelete)=>{
  console.log(learnDelete)

  return api.delete(`/users/learned/${learnDelete}`)
}

// Login page 
export const forgotPassword = (email,newpassword,confirmpassword)=>{
  return api.patch("/users/resetPassword",{
          email:email,
          password:newpassword,
          password1:confirmpassword
  })
}

// profile  wrapper
export const userProfile = (id)=>{
  return api.get(`/users/${id}`)
}

// profile Api's
export const deleteProfile = ()=>{
  return api.delete("/users/deleteProfile")
}



// service api's
export const fetchMyServices = ()=>{
  return api.get("/services/getuserservices")
}

export const createService = (id,title,description,cateogory,type)=>{
return api.post("/services/create",{ 
        user: id,
        title:title,
        description: description,
        cateogory:cateogory,
        type:type

})
}

export const updateService = (id,data)=>{
  return api.put(`/services/updateservice/${id}`,data)
}

export const deleteService = (id)=>{
return api.delete(`/services/deleteService/${id}`)
}
// Signup Api's
export const signup =(formData)=>{
  return api.post("/auth/register",formData,{
      headers:{"Content-Type" : "multipart/form-data",

  },
})
  }


  // swap requests
  export const myIncoming = ()=>{
    return api.get("/swaps/incoming")
  }

  export const  myOutgoingRequest = (currentPage)=>{
return api.get(`/swaps/outgoing?limit=3&page=${currentPage}`)
  }

  export const acceptRequest = (id,status)=>{
    return api.put(`/swaps/update/${id}`,{status})
  }
  export const rejectRequest = (id,status)=>{
    return api.put(`/swaps/update/${id}`,{status})
  }

  // notification Api's
  export const notification = ()=>{
    return api.get("/notifications/all")
  }
export default api;