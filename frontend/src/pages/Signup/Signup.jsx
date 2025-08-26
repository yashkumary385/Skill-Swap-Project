import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { User, Eye, Mail, Lock, ClipboardPenLine } from "lucide-react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'react-toastify/dist/ReactToastify.css';
import {  toast, Bounce } from 'react-toastify';
import { Link } from "react-router-dom";
import { signup } from "../../api/api";

const validateEmail = (email) => {
    // Regular expression for a basic email validation
    // It checks for:
    // ^[\w.-]+ : Starts with one or more word characters, dots, or hyphens
    // @ : Followed by an '@' symbol
    // [\w.-]+ : Then one or more word characters, dots, or hyphens (for the domain name)
    // \. : Followed by a dot
    // [A-Za-z]{2,}$: Ends with 2 or more letters (for the top-level domain)
    const re = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    // Regular expression for password validation
    // It checks for:
    // (?=.*[a-z]) : At least one lowercase letter
    // (?=.*[A-Z]) : At least one uppercase letter
    // (?=.*\d) : At least one digit
    // (?=.*[@$!%*?&]) : At least one special character from the set @$!%*?&
    // [A-Za-z\d@$!%*?&]{8,} : Minimum of 8 characters, consisting of letters, digits, and the allowed special characters
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
};

function Signup() {


    const [education, SetEducation] = useState([]) // array state 
    const [educationForm, SetEducationForm] = useState( // object state will insert into the array later 
        {
            instituition: "",
            degree: "",
            startDate: "",
            endDate: "",
            score: ""
        }
    )
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        skills: [],
        bio: "",
        education: [],
        learned: [],
        image: "",
        username:""


    })
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const setVisibility = () => {
        setShowPassword(!showPassword)
    }
    const [skills, setSkills] = useState("")
    const [learned, setLearned] = useState("")


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


    const handleSignup = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            toast.warning("Name, Email, and Password are required!");
            return;
        }

        if (form.name.length < 3) {
            toast.warning("Name must be at least 3 characters long.");
            return;
        }

        if (!validateEmail(form.email)) {
            toast.warning("Please enter a valid email address!");
            return;
        }

        if (!validatePassword(form.password)) {
            toast.warning("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        console.log(form)
        try {
            const formData = new FormData();
            formData.append("name",form.name)
            formData.append("username",form.username)
            formData.append("email",form.email)
            formData.append("password",form.password)
            formData.append("bio",form.bio)
         formData.append("skills", JSON.stringify(form.skills));
            formData.append("education",JSON.stringify(form.education))
            formData.append("learned",JSON.stringify(form.learned))
            // formData.append("education",form.education)

         if (form.image) {
  formData.append("image", form.image);
}

            for (let pair of formData.entries()) {
  console.log(pair[0] + ': ' + pair[1]);
}


            const res = await signup(formData)
            console.log(res)
            toast.success("Signup successful!");
            setTimeout(() => {
                navigate("/login")
            }, 1500)



        } catch (error) {
            console.error("Signup error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error("Network error. Please check your internet connection.");
            } else {
                toast.error("An unexpected error occurred during signup.");
            }

        }











    }
    const handleSkill = (e) => {
        e.preventDefault();
        if (form.skills.length === 3) {

            //   toast.warning('You can only add up to 3 skills!');
            notify();
            return;
        } else {
            // setForm((prev) => ({ ...prev, skills: [...prev.skills, skills] }));
            setForm((prev) => ({ ...prev, skills: [...prev.skills,skills] }))

        }
        setSkills("")
    }
    // i ahve to see from here

    const handleEducation = (e) => {
        e.preventDefault();

        // if (educationForm.score !== null && isNaN(Number(educationForm.score))) {
        //     toast.warning("Please enter a valid number for Marks Obtained in Cgpa.");
        //     return;
        // }

        const updatedEducation = [...education, educationForm];
        SetEducation(updatedEducation);
        // SetEducation((prev)=>[...education , educationForm ])
        // SetEducation((prev) => [{...prev, educationForm}])
        setForm(prev => ({ ...prev, education: updatedEducation }));
        // SetEducationForm({
        //     instituition: "",
        //     degree: "",
        //     startDate: "",
        //     endDate: "",
        //     score: ""
        // }); // i will see about this if any error occurs 
    }
    const handleLearn = (e) => {
        e.preventDefault();
        setForm((prev) => ({ ...prev, learned: [...prev.learned, learned] }))
        console.log(learned)
        setLearned("")

    }
    return (
        <div className="min-h-screen bg-[#4CAF50] flex justify-center items-center font-serif p-4">
            <div className="w-full max-w-md p-6 flex flex-col items-center rounded-lg bg-[#F9FAFB] gap-6">

                <div className="text-2xl font-bold">Signup</div>
                <div className="flex items-center justify-center"><User className="w-6 h-6 text-gray-600" /></div>


                <Tabs
                    defaultActiveKey="Credentails"

                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3 w-full"
                    fill
                >
                    <Tab eventKey="Credentails" title="Credentails">




                        <form className="flex flex-col items-center justify-center gap-3 w-full p-2"  >
                            <div className="w-full relative">
                                <div><User className="absolute top-2 left-2 w-6 h-6" /></div>
                                <input type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Name"
                                    className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                />
                          <input type="text"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    placeholder="UserName"
                                    className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                />
                            </div>
                            <div className="w-full relative">
                                <div><Mail className="absolute top-2 left-2 w-6 h-6" /></div>
                                <input type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="Email"
                                    className="border-2  border-[#4CAF50]  pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"


                                />
                            </div >
                            <div className="relative w-full">
                                <div><Lock className="absolute top-2 left-2 w-6 h-6" /></div>

                                <input type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Password"
                                    className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                />
                                <div className="absolute top-2 right-2 cursor-pointer" onClick={setVisibility}><Eye /></div>
                            </div>
                            <div className="w-full">
                                <label>Profile Image</label>
                                <input
                                    type="file"
                                    placeholder="Select image"
                                    className="border-2 border-[#4CAF50] pl-2 pr-2 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                                    accept="image/*"

                                    onChange={(e) => setForm({ ...form , image: e.target.files[0] })}
                                />

                            </div>
                            <Button onClick={handleSignup} variant="outline-success" className="w-full mt-4 py-2">
                                Signup
                            </Button>
                        </form>
                                                     <div className="mt-4 text-center w-full">
          Have An Account ? <Link to="/Login" className="text-[#4CAF50] font-bold">Login</Link>
        </div>
                    </Tab>
                    <Tab eventKey="Details" title="Details">
                        <form className="flex flex-col items-center justify-center gap-3 w-full p-2">
                            <div className="w-full relative">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6" /></div>
                                <textarea
                                    value={form.bio}
                                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                    placeholder="Bio"
                                    className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] h-24"

                                ></textarea>
                            </div>
                            <div className="w-full relative ">
                                {form.skills.length < 3 && <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>}
                                <div className="flex flex-col sm:flex-row gap-3 w-full ">
                                    <input
                                        type={form.skills.length === 3 ? "hidden" : "text"}
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        placeholder="Skills"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                    />
                                    <Button variant="outline-success" onClick={handleSkill} className="w-full sm:w-auto">Add</Button>
                                </div>
                            

                                <div className="w-full">
                                    <ul className="flex flex-wrap gap-2 pt-3 items-center justify-center sm:justify-start">
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
                        <form className="flex flex-col items-center justify-center gap-3 w-full p-2" onSubmit={handleEducation}>
                            <div className="w-full relative">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6" /></div>
                                <input type="text"
                                    value={educationForm.instituition}
                                    onChange={(e) => SetEducationForm({ ...educationForm, instituition: e.target.value })}
                                    placeholder="Institute"
                                    className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                />
                            </div>
                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full ">
                                    <input
                                        type="text"
                                        value={educationForm.degree}
                                        onChange={(e) => SetEducationForm({ ...educationForm, degree: e.target.value })}

                                        placeholder="Degree"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                    />

                                </div>
                            </div>
                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full ">
                                    <input
                                        type="number"
                                        value={educationForm.score}
                                        onChange={(e) => SetEducationForm({ ...educationForm, score: e.target.value === '' ? '' : Number(e.target.value) })}

                                        placeholder="Marks Obtained in Cgpa"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                    />

                                </div>
                            </div>
                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full ">
                                    <input
                                        type="date"
                                        value={educationForm.startDate}
                                        onChange={(e) => SetEducationForm({ ...educationForm, startDate: e.target.value })}

                                        placeholder="Start Date"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                    />

                                </div>
                            </div>
                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full ">
                                    <input
                                        type="date"
                                        value={educationForm.endDate}
                                        onChange={(e) => SetEducationForm({ ...educationForm, endDate: e.target.value })}

                                        placeholder="End Date"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                    />

                                </div>
                            </div>


                            <div className="w-full relative ">
                                <div><ClipboardPenLine className="absolute top-2 left-2 w-6 h-6 " /></div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full ">
                                    <input
                                        type="text "
                                        value={learned}
                                        onChange={(e) => setLearned(e.target.value)}

                                        placeholder="Skills Learned"
                                        className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"

                                    />
                                    <div> <Button variant="outline-success" onClick={handleLearn} className="w-full sm:w-auto">Add</Button></div>

                                </div>
                                <div className="w-full">
                                    <ul className="flex flex-wrap gap-2 pt-2 items-center justify-center sm:justify-start">
                                        {
                                            form.learned.map((learn, index) => (
                                                <li key={index}>   <Button variant="outline-success" >{learn}</Button></li>
                                            ))
                                        }


                                    </ul>
                                </div>


                            </div>
                            {/* { form.education.length === 0  && */}
                            <Button variant="outline-success" type="submit" className="w-full py-2">Add Details</Button>
                            {/* } */}




                        </form>
                        <Button onClick={handleSignup} variant="outline-success" className="w-full mt-4 py-2">
                            Signup
                        </Button>
                    </Tab>
         

                </Tabs>




            </div>
        </div>










    )

}

export default Signup;