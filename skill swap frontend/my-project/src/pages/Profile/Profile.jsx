import React from 'react'
import { useAuth } from '../../context/useAuth.js';
import { Card } from 'react-bootstrap';
import Header from '../../components/Navbar/Navbar';
import { Mail, User, SquareArrowUpRight, UserCircle } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import EditProfile from '../EditProfile/EditProfile';
import { useNavigate } from 'react-router-dom';

const Profile = ({ externalUser }) => {
    const { user: authUser, loading } = useAuth();
    const user = externalUser || authUser
    const navigate = useNavigate()
    const navigateTo = () => {
        navigate('/editProfile')
    }
    const isOwnProfile = !externalUser;
    return (
        <>
            <Header />
            <div className='min-h-[100vh] bg-[#4CAF50] flex flex-row '>
                <div id="left" className="w-[50vw] flex flex-col pt-20 pl-10 gap-10 text-white">
                    {/* Top section: Image + Info */}
                    <div className="flex flex-row items-start gap-6">
                        <Card style={{ width: '150px', height: '150px' }}>
                            <Card.Img
                                variant="top"
                                src={`http://localhost:8000/${user?.image}`}
                                className="object-cover w-full h-full"
                            />
                        </Card>

                        <div className="flex flex-col justify-center gap-3 text-xl font-bold">
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
                    <div className="pt-4">
                        <div className="text-2xl font-bold mb-2">Bio</div>
                        <div className="text-lg font-md">{user?.bio}</div>
                    </div>

                    {/* Skills Section */}
                    <div>
                        <div className="text-2xl font-bold mb-2">Skills</div>
                        <div className="flex flex-wrap gap-3">
                            {user?.skills.map((skill, index) => (
                                <Button variant="success" key={index}>
                                    {skill}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className='text-2xl font-bold'>
                        <div>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Education</Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            user?.education.map((field, index) => (
                                                <div className='text-2xl flex flex-col gap-2 ' key={index} >
                                                    Institute : {field.instituition}
                                                    <div className='text-sm ' >Degree : {field.degree}</div>
                                                    <div className='text-sm'> Duration :  {field.startDate} - {field.endDate}</div>
                                                    <div className='text-sm'> Cgpa :  {field.score} </div>
                                                </div>
                                            ))




                                        }


                                        <div className='flex flex-row gap-2 text-md'>CourseWork:


                                            <div className="flex flex-wrap gap-3">
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

                <div id="right" className='flex pt-20 pl-10 flex-col ' >
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" onClick={navigateTo} >Update Profile ✎</Button>

                    </div>
                </div>
}

            </div >
        </>
    )
}

export default Profile
