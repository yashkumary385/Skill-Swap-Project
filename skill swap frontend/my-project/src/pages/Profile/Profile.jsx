import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Card } from 'react-bootstrap';
import Header from '../../components/Navbar/Navbar';
import { Mail, User ,SquareArrowUpRight } from 'lucide-react';
import Button from 'react-bootstrap/Button';

const Profile = () => {
    const { user, loading } = useAuth();
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
                                src={`http://localhost:8000/${user.image}`}
                                className="object-cover w-full h-full"
                            />
                        </Card>

                        <div className="flex flex-col justify-center gap-3 text-xl">
                            <div className="flex items-center gap-2">
                                <User /> {user.name}
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail /> {user.email}
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="pt-4">
                        <div className="text-2xl font-bold mb-2">Bio</div>
                        <div className="text-lg font-light">{user.bio}</div>
                    </div>

                    {/* Skills Section */}
                    <div>
                        <div className="text-2xl font-bold mb-2">Skills</div>
                        <div className="flex flex-wrap gap-3">
                            {user.skills.map((skill, index) => (
                                <Button variant="success" key={index}>
                                    {skill}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>


                <div id="right" className='flex pt-20 pl-10 flex-col ' >
                    <div className="flex items-center gap-2">
                                <Button variant="secondary">Update Profile ✎</Button>

                            </div>
                </div>


            </div>
        </>
    )
}

export default Profile
