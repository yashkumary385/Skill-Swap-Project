// education is rendering more than 1 array when i submit it takes multiple arrays 
import React, { useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useAuth} from '../../context/useAuth.js';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const validateEmail = (email) => {
//   const re = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
//   return re.test(String(email).toLowerCase());
// };

// const validatePassword = (password) => {
//   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return re.test(password);
// };

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  
    const [educationForm, setEducationForm] = useState( {
          instituition:"",
      degree:"",
      startDate:"",
      endDate:"",
      score:""
    })// setting this through input .

  const navigate = useNavigate();
  const { user, setUser, token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    // image: "",
    skills: [],
    bio: "",
    education:[],
    learned: []
  });
useEffect(()=>{
   setEducationForm( {
      instituition:user?.education[0]?.instituition || "",
      degree: user?.education[0]?.degree || "",
      startDate: user?.education[0]?.startDate || "",
      endDate: user?.education[0]?.endDate || "",
      score: user?.education[0]?.score || ""
    }
   )
  
},[user])


  const [skills, setSkills] = useState("")
  const [learned, setLearned] = useState("")
  const [password, setPassword] = useState(""); // New state for password

  useEffect(() => {
    console.log(user)
    setForm({
      username: user?.username || "",
      email: user?.email || "",
      name: user?.name || "",
      skills: user?.skills || [],
      // image: user?.image || "",
      learned: user?.learned || [],
      education: user?.education || [],
      bio: user?.bio || ""
    })
  }, [user])

  const handleSkill = (e) => {
    e.preventDefault();
    // if (!skills.trim()) {
    //   toast.warning("Skill cannot be empty!");
    //   return;
    // }
    setForm((prev) => ({ ...prev, skills: [...prev.skills, skills] }))
    setSkills("")
  }
  const handleLearn = (e) => {
        e.preventDefault();
    // if (!learned.trim()) {
    //   toast.warning("Learned skill cannot be empty!");
    //   return;
    // }
    setForm((prev) => ({ ...prev, learned: [...prev.learned,learned] }))
    setLearned("")
  }

  const handleEducation = () => {
    if (!educationForm.instituition || !educationForm.degree || !educationForm.startDate || !educationForm.endDate || !educationForm.score) {
      toast.warning("Please fill in all education fields.");
      return;
    }

  setForm((prev) => ({
  ...prev,
  education: [
    { ...prev.education[0], ...educationForm } // merge updates into existing object
  ],
}));

    console.log(educationForm)
    setEducationForm({
      instituition: "",
      degree: "",
      startDate: "",
      endDate: "",
      score: ""
    });
  }

  const handleSubmit = async () => {
    // if (!form.name || !form.username || !form.email) {
    //   toast.warning("Name, Username, and Email are required!");
    //   return;
    // }

    // if (form.name.length < 3) {
    //   toast.warning("Name must be at least 3 characters long.");
    //   return;
    // }

    // if (!validateEmail(form.email)) {
    //   toast.warning("Please enter a valid email address!");
    //   return;
    // }

    // if (password && !validatePassword(password)) {
    //   toast.warning("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
    //   return;
    // }

    try {
      console.log(form.education)
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name",form.name)
      formData.append("username",form.username)
      formData.append("email",form.email)
      formData.append("password",form.password)
      formData.append("skills", JSON.stringify(form.skills));
      formData.append("bio",form.bio)
      formData.append("education",JSON.stringify(form.education))
      formData.append("image",form.image)
      formData.append("learned", JSON.stringify(form.learned));
      // formData.append("education",form.education)
          for (let pair of formData.entries()) {
  console.log(pair[0] + ': ' + pair[1]);
}
      const res = await axios.put("http://localhost:8000/updateUser", 
        formData
      , {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(res);
      setUser(res.data)
      toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.response && error.response.data && error.response.data) {
        toast.error(error.response.data.error);
      } else if (error.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred during profile update.");
      }
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className='min-h-[100vh] bg-[#4CAF50] flex justify-center items-center flex-col'>
      <h1 className='mb-4'>Update User Details</h1>
      <div className='flex justify-center items-center flex-col h-[80.8vh] border-3 border-black rounded-2xl w-[30vw] bg-gray-200 text-black'>


        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>UserName</Form.Label>
              <Form.Control type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />


              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />


              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

              <Form.Label>New Password (optional)</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank if not changing" />

              {/* <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} /> */}
            </Form.Group>
            <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Submitting..." : "Submit"} </Button>
          </Tab>   
          <Tab eventKey="profile" title="Profile">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Skills</Form.Label>
              <Form.Control type="text" value={skills} onChange={(e) =>setSkills(e.target.value)} />
              <Button onClick={handleSkill}>Add</Button>
              <div>{user?.skills.map((skill)=>(
                <ul>
                  <li class="inline-block border  bg-[#4CAF50] rounded-lg px-2 py-1" key = {skill} >{skill} X</li>
                </ul>
              ))}</div>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control type="text" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </Form.Group>
          </Tab>
          <Tab eventKey="contact" title="Education">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Instituition</Form.Label>
              <Form.Control type="text" value={educationForm.instituition} onChange={(e) => setEducationForm((prev) => ({ ...prev, instituition: e.target.value }))} />

              <Form.Label>Degree</Form.Label>
              <Form.Control type="text" value={educationForm.degree} onChange={(e) => setEducationForm((prev) => ({ ...prev, degree: e.target.value }))} />

              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={educationForm.startDate} onChange={(e) => setEducationForm((prev) => ({ ...prev, startDate: e.target.value }))} />

              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" value={educationForm.endDate} onChange={(e) => setEducationForm((prev) => ({ ...prev, endDate: e.target.value }))} />

              <Form.Label>CGPA</Form.Label>
              <Form.Control type="text" value={educationForm.score} onChange={(e) => setEducationForm((prev) => ({ ...prev, score: e.target.value }))} />
              <label >Learned</label>
              <form className='flex flex-row gap-2'>
                <input type="text"
                  value={learned}
                  onChange={(e) => setLearned(e.target.value)}
                  placeholder='Skills learned'
                  className='p-2 bg-white mb-2 rounded-lg'
                />
                   <div>{user?.learned.map((learn)=>(
                <ul>
                  <li class="inline-block border-2 bg-[#4CAF50] rounded-lg px-2 py-1" key = {learn} >{learn} X</li>
                </ul>
              ))}</div>
                <Button variant="outline-success" onClick={handleLearn} disabled={isLoading}>{isLoading ? "Adding..." : "Add"}</Button>
              </form>
              <Button ariant="outline-success " onClick={handleEducation} disabled={isLoading}>{isLoading ? "Adding..." : "Add Education"}</Button>
            </Form.Group>
          </Tab>
        </Tabs>











      </div>
    </div>
  )
}

export default EditProfile
