import React from 'react'
import { useAuth } from '../../context/useAuth.js';
import { Card } from 'react-bootstrap';
import Header from '../../components/Navbar/Navbar';
import { Mail, User, UserCircle } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

const Profile = ({ externalUser }) => {
    const { user: authUser} = useAuth();
    const user = externalUser || authUser
    const navigate = useNavigate()
    const navigateTo = () => {
        navigate('/editProfile')
    }
    const isOwnProfile = !externalUser;
    return (
        <>
            <Header />
            <div className='min-h-screen bg-[#4CAF50] flex flex-col lg:flex-row p-4 lg:p-10 '>
                <div id="left" className="w-full lg:w-[60vw] flex flex-col pt-8 lg:pt-20 px-4 lg:pl-10 gap-6 lg:gap-10 text-white">
                    {/* Top section: Image + Info */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                        <Card style={{ width: '120px', height: '120px' }} className="flex-shrink-0">
                            <Card.Img
                                variant="top"
                                src={`${user?.image}`}
                                className="object-cover w-full h-full"
                            />
                        </Card>
                        <div className="flex flex-col justify-center items-center sm:items-start gap-2 text-xl font-bold text-center sm:text-left">
                            <div className='flex items-center gap-2'>
                                <UserCircle /> {user?.username}
                            </div>
                            <div className="flex items-center gap-2">
                                <User /> {user?.name}
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail /> {user?.email}
                            </div>

                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="pt-4 sm:text-left">
                        <div className="text-2xl font-bold mb-2">Bio</div>
                        <div className="text-lg font-md">{user?.bio}</div>
                    </div>

                    {/* Skills Section */}
                    <div className=" sm:text-left">
                        <div className="text-2xl font-bold mb-2">Skills</div>
                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                            {user?.skills.map((skill, index) => (
                                <Button variant="success" key={index}>
                                    {skill}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className='text-2xl font-bold w-full '>
                        <div className="w-full">

                            <Accordion defaultActiveKey="0" className="w-full">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Education</Accordion.Header>
                                    <Accordion.Body className="text-black text-base">
                                        {
                                            user?.education.map((field, index) => (
                                                <div className='text-lg flex flex-col gap-2 mb-4' key={index} >
                                                    <p><strong>Institute:</strong> {field.instituition}</p>
                                                    <p><strong>Degree:</strong> {field.degree}</p>
                                                    <p><strong>Duration:</strong> {field.startDate} - {field.endDate}</p>
                                                    <p><strong>CGPA:</strong> {field.score} </p>
                                                </div>
                                            ))



                                        }


                                        <div className='flex flex-col sm:flex-row gap-2 text-md mt-3'>
                                            CourseWork

                                            <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
                                                {user?.learned.map((learned, index) => (
                                                    <Button variant="success" key={index}>
                                                        {learned}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>




                        </div>



                    </div>
                </div>
{isOwnProfile &&

                <div id="right" className='w-full lg:w-[40vw] flex pt-4 lg:pt-20 px-4 lg:pl-10 flex-col items-center lg:items-start' >
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" onClick={navigateTo} className="w-full lg:w-auto">Update Profile ✎</Button>

                    </div>
                </div>
}

            </div >
        </>
    )
}

export default Profile
