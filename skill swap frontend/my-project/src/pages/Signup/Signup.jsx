import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios"
import { User, Eye, Mail, Lock } from "lucide-react";
export const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const setVisibility = () => {
        setShowPassword(!showPassword)
    }


    const Signup = async (e) => {
        e.preventDefault();
        console.log(form)
        try {
            const res = await axios.post("http://localhost:8000/api/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password
            })

            console.log(res)
            setTimeout(() => {
                navigate("/login")
            }, 1500)

        } catch (error) {
            console.log(error)

        }

    }

    return (
        <div className="min-h-[100vh] bg-[#4CAF50] flex justify-center items-center">
            <div className="w-[350px] p-6 flex flex-col items-center rounded-lg bg-[#F9FAFB] gap-6">

                <div className="text-2xl font-bold">Signup</div>
                <div className="flex items-center justify-center"><User className="w-6 h-6 text-gray-600" /></div>

                <form className="flex flex-col items-center justify-center gap-3 w-full" onSubmit={Signup} >
                    <div className="w-full relative">
                        <div><User className="absolute top-2 left-2 w-6 h-6" /></div>
                        <input type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Name"
                            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                        />
                    </div>
                    <div className="w-full relative">
                        <div><Mail className="absolute top-2 left-2 w-6 h-6" /></div>
                        <input type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Email"
                            className="border-2  border-[#4CAF50]  pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"


                        />
                    </div >
                    <div class="relative w-full">
                        <div><Lock className="absolute top-2 left-2 w-6 h-6" /></div>

                        <input type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="Password"
                            className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                        />
                        <div className="absolute top-2 right-2" onClick={setVisibility}><Eye /></div>
                    </div>
                    <Button type="submit" variant="outline-success" className="w-full">
                        Signup
                    </Button>
                </form>
            </div>
        </div>






    )

}