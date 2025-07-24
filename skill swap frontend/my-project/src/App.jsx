import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup"
import AboutUs from "./pages/AboutUs/AboutUs";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Discover from "./pages/Discover/Discover";
import Services from "./pages/Services.jsx/Services";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
       
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/profile" element={<PrivateRoutes>
            <Profile/>
        </PrivateRoutes>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/discover" element={<Discover/>}/>
        <Route path="/services" element={<Services/>}/>
                {/* <Route path="/editprofile" element={<PrivateRoutes>
            <EditProfile/>
        </PrivateRoutes>}/> */}
        
    </>
    )
)

