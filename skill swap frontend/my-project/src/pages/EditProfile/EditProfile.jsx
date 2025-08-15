// education is rendering more than 1 array when i submit it takes multiple arrays 
import React, { useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useAuth } from '../../context/useAuth.js';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

  const navigate = useNavigate();
  const { user, setUser, token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    image: "",
    skills: [],
    bio: "",
    education: [],
    learned: []
  });


  const [educationForm, setEducationForm] = useState( // setting this through input .
    {
      instituition: "",
      degree: "",
      startDate: "",
      endDate: "",
      score: ""
    }

  )
  const [skills, setSkills] = useState("")
  const [learned, setLearned] = useState("")
  // const [education, setEducation] = useState([])







  useEffect(() => {
    setForm({
      username: user?.username || "",
      email: user?.email || "",
      name: user?.name || "",
      skills: user?.skills || [],
      image: user?.image || "",
      learned: user?.learned || [],
      education: user?.education || [],
      bio: user?.bio || ""
    })

    // setEducation(
    //   user?.education || []
    // )
  }, [user])

  const handleSkill = () => {
    //  if(form.skills.length) notify();
    setForm((prev) => ({ ...prev, skills: [...prev.skills, skills] }))
    setSkills("")
  }
  const handleLearn = () => {
    setForm((prev) => ({ ...prev, learned: [...prev.learned, learned] }))
    setLearned("")
  }
  // here look here please 


  const handleEducation = () => {
    if (!educationForm.instituition || !educationForm.degree) {
      alert("Please fill in institution and degree fields.");
      return;
    }

    // const updatedEducation = [...form.education, educationForm];

    setForm((prev) => ({
      ...prev,
      education:[educationForm]
    }));
    // i am nesting another array in eduactoion You're nesting arrays: education: [...prev.education, updatedEducation] adds the entire updatedEducation array inside another array — it should be education: updatedEducation.
    setEducationForm({
      instituition: "",
      degree: "",
      startDate: "",
      endDate: "",
      score: ""
    });
    console.log(educationForm)

  }


  const handleSubmit = async () => {
    try {
      const res = await axios.put("http://localhost:8000/updateUser", {
        name: form.name,
        username: form.username,
        email: form.email,
        skills: form.skills,
        bio: form.bio,
        education: form.education,
        learned: form.learned,
        image: form.image
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      )
      console.log(form.education)
      console.log(res);
      setUser(res.data)
      // toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.log(error)
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
              <Form.Control type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />


              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />



              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
            </Form.Group>
            <Button onClick={handleSubmit}>Submit</Button>




          </Tab>
          <Tab eventKey="profile" title="Profile">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Skills</Form.Label>
              <Form.Control type="text" onChange={(e) => setSkills(e.target.value)} />
              <Button onClick={handleSkill}>Add</Button>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control type="text" onChange={(e) => setForm({ ...form, bio: e.target.value })} />
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
              <Form.Control type="text" onChange={(e) => setEducationForm((prev) => ({ ...prev, score: e.target.value }))} />
              <label >Learned</label>
              <form className='flex flex-row gap-2'>
                <input type="text"
                  value={learned}
                  onChange={(e) => setLearned(e.target.value)}
                  placeholder='Skills learned'
                  className='p-2 bg-white mb-2 rounded-lg'
                />
                <Button variant="outline-success" onClick={handleLearn}>Add</Button>
              </form>
              <Button ariant="outline-success " onClick={handleEducation}>Add Education</Button>

            </Form.Group>
          </Tab>
        </Tabs>










      </div>
    </div>
  )
}

export default EditProfile
