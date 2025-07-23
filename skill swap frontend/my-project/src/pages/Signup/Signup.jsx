import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios"
import { User, Eye, Mail, Lock, ClipboardPenLine } from "lucide-react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast, Bounce } from 'react-toastify';


export const Signup = () => {


    const [education, SetEducation] = useState([])
    const [educationForm, SetEducationForm] = useState(
        {
            instituition: "",
            degree: "",
            startDate: "",
            endDate: "",
            learned: [],
            score: ""
        }
    )
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        skills: [],
        bio: "",
        education:[]

    })
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const setVisibility = () => {
        setShowPassword(!showPassword)
    }
    const [skills, setSkills] = useState("")


    const notify = () => toast.info('3 Skills Only!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
    ;


    const Signup = async (e) => {
        e.preventDefault();
        console.log(form)
        try {
            const res = await axios.post("http://localhost:8000/api/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password,
                bio: form.bio,
                skills: form.skills,
                education: form.education


            })

            console.log(res)
            setTimeout(() => {
                navigate("/login")
            }, 1500)

        } catch (error) {
            console.log(error)

        }

    }
    const handleSkill = (e) => {
        e.preventDefault();
        if (form.skills.length === 3) {

            //   toast.warning('You can only add up to 3 skills!');
            notify();
            return;
        } else {
            setForm((prev) => ({ ...prev, skills: [...prev.skills, skills] }));

        }
        setSkills("")
    }
    // i ahve to see from here
    
    const handleEducation = (e) => {
        e.preventDefault();
        // const updatedEducation = [...education, educationForm];
        // SetEducation(updatedEducation);
        SetEducation((prev) => [...prev, educationForm])
        setForm(prev => ({ ...prev, education: education }));
        SetEducationForm({
            instituition: "",
            degree: "",
            startDate: "",
            endDate: "",
            learned: [],
            score: ""
        });

    }



    return (
        <div className="min-h-[100vh] bg-[#4CAF50] flex justify-center items-center">
            <div className="w-[350px] p-6 flex flex-col items-center rounded-lg bg-[#F9FAFB] gap-6">

                <div className="text-2xl font-bold">Signup</div>
                <div className="flex items-center justify-center"><User className="w-6 h-6 text-gray-600" /></div>


                <Tabs
                    defaultActiveKey="Credentails"

                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Credentails">
                        Tab content for Home



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
                            <div className="relative w-full">
                                <div><Lock className="absolute top-2 left-2 w-6 h-6" /></div>

                                <input type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Password"
                                    className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                                />
                                <div className="absolute top-2 right-2" onClick={setVisibility}><Eye /></div>
                            </div>
                            <div>
                                <input type="file" name="" id="" />
                            </div>
                            <Button type="submit" variant="outline-success" className="w-full">
                                Signup
                            </Button>
                        </form>
                    </Tab>
                    <Tab eventKey="Details" title="Details">
                        <form className="flex flex-col items-center justify-center gap-3 w-full">
                            <div className="w-full relative">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6" /></div>
                                <input type="text"
                                    value={form.bio}
                                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                    placeholder="Bio"
                                    className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                                />
                            </div>
                            <div className="w-full relative ">
                                {form.skills.length < 3 && <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>}
                                {/* {form.skills.length  3 && */}
                                <div className="flex flex-row gap-3 ">
                                    <input
                                        type={form.skills.length === 3 ? "hidden" : "text"}
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        placeholder="Skills"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                                    />
                                    <Button variant="outline-success" onClick={handleSkill}>Add</Button>
                                </div>
                                {/* } */}


                                {/* } */}
                                <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="dark"
                                    transition={Bounce}
                                />


                                <div className="">
                                    <ul className="flex flex-row gap-2 pt-3 items-center justify-content">
                                        {
                                            form.skills.map((skill, index) => (
                                                <li key={index}>   <Button variant="outline-success" >{skill}</Button></li>
                                            ))
                                        }



                                    </ul>
                                </div>
                            </div>
                        </form>
                    </Tab>
                    <Tab eventKey="Education" title="Education"  >
                        <form className="flex flex-col items-center justify-center gap-3 w-full" onSubmit={handleEducation}>
                            <div className="w-full relative">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6" /></div>
                                <input type="text"
                                    value={educationForm.instituition}
                                    onChange={(e) => SetEducationForm({ ...educationForm, instituition: e.target.value })}
                                    placeholder="Institute"
                                    className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                                />
                            </div>
                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-row gap-3 ">
                                    <input
                                        type="text"
                                        value={educationForm.degree}
                                        onChange={(e) => SetEducationForm({ ...educationForm, degree: e.target.value })}

                                        placeholder="Degree"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                                    />

                                </div>
                            </div>
                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-row gap-3 ">
                                    <input
                                        type="text"
                                        value={educationForm.score}
                                        onChange={(e) => SetEducationForm({ ...educationForm, score: e.target.value })}

                                        placeholder="Marks Obtained in Cgpa"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                                    />

                                </div>
                            </div>
                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-row gap-3 ">
                                    <input
                                        type="date"
                                        value={educationForm.startDate}
                                        onChange={(e) => SetEducationForm({ ...educationForm, startDate: e.target.value })}

                                        placeholder="Start Date"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                                    />

                                </div>
                            </div>
                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-row gap-3 ">
                                    <input
                                        type="date"
                                        value={educationForm.endDate}
                                        onChange={(e) => SetEducationForm({ ...educationForm, endDate: e.target.value })}

                                        placeholder="End Date"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100"

                                    />

                                </div>
                            </div>
                            <Button variant="outline-success" type="submit">Submit</Button>
                        </form>
                    </Tab>
                </Tabs>
















            </div>
        </div>






    )

}