import { useState } from "react";
import { useAuth } from '../../context/useAuth.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Lock ,Mail } from "lucide-react";
export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    console.log("hahah")
    e.preventDefault();
    const result = await login(email, password)
    console.log(result); // this result is success that we add 
    
    if (result.success) {
      
      navigate("/")
    }
    else {
      console.log("error")
       
    }
  }
  return (

    <div
      className="flex justify-center items-center min-h-[100vh]"
      style={{ backgroundColor: "#4CAF50" }}
    >
      <div
        className="w-[350px] p-6 rounded-lg shadow-md bg-[#F9FAFB] flex flex-col items-center gap-6"
      >
        <div className="text-2xl font-bold">Login</div>
        {/* Icon Centered */}
        <div className="flex justify-center items-center">
          <Lock className="w-6 h-6 text-gray-600" />
        </div>


        {/* Form Centered */}
        <form
          className="flex flex-col gap-3 w-full"
          onSubmit={handleLogin}
        >
          <div className="relative w-full">
           <div><Mail className="absolute top-2 left-2 w-6 h-6"/></div>

          <input
            type="email"
            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
           <div className="relative w-full">
           <div><Lock className="absolute top-2 left-2 w-6 h-6"/></div>
            
          <input
            type="password"
            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <Button type="submit" variant="outline-success" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>


  )

}