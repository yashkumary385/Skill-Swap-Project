import React, { useEffect, useState } from 'react';
import Header from '../../components/Navbar/Navbar';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useAuth } from '../../context/useAuth.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


const AcceptedReq = () => {
    // Dummy notifications for layout demo
    const [acceptedReq, setAcceptedReq] = useState([]);
    const [outAcceptedReq, setOutAcceptedReq] = useState([]); 
    const { token } = useAuth();

    const navigate = useNavigate()
    useEffect(() => {
       const request = async () => {
            try {
                const res = await axios.get("http://localhost:8000/incoming/accepted",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                setAcceptedReq(res.data.acceptedReq)
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }
        request()
    }, []) 
    useEffect(() => {
       const request = async () => {
            try {
                const res = await axios.get("http://localhost:8000/out/accepted",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                setOutAcceptedReq(res.data.outAcceptedReq)
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }
        request()
    }, []) 
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#4CAF50] p-4 md:p-6 flex flex-col md:flex-row gap-4">
             <div className='w-full md:w-1/2'>
                <h2 className="text-3xl font-bold text-white mb-6 text-center md:text-left">Accepted Incoming Request</h2>

                <div className="flex flex-col gap-4 max-w-full mx-auto">

                    {acceptedReq.length > 0 ? 
                        <ul className="w-full">
                            {acceptedReq.map((request) => (
                                <Card key={request.swap._id} className="mb-3 w-full max-w-xl mx-auto">
                                    <Card.Body>
                                        <Card.Title>Swap Request</Card.Title>

                                        <Card.Subtitle className="mb-2 text-muted">
                                            From: {request.swap.requester?.name}
                                        </Card.Subtitle>

                                        <Card.Text>
                                            <strong>Email:</strong> {request.swap.requester?.email} <br />
                                            <strong>They Offered:</strong> {request.swap.requesterService?.title} <br />
                                            <strong>Requested Your Service:</strong> {request.swap.recepientService?.title || request.swap.recepientService} <br />
                                            <strong>Status:</strong> {request?.swap?.status} <br />
                                            <strong>Date:</strong> {new Date(request.swap.createdAt).toLocaleString()}
                                        </Card.Text>

                                        <Button variant="success"
                                            className="me-2"
                                            onClick={() => navigate(`/chat/${request.chat.map((chat) => (
                                                chat._id
                                            ))}`)}
                                        >Go to Chats</Button>




                                    </Card.Body>
                                </Card>
                            ))}


                        </ul> :
                        <div className="text-white text-center"> No request yet</div>
                    }
                </div>
                </div>
                <div className='w-full md:w-1/2'>
                <h2 className="text-3xl font-bold text-white mb-6 text-center md:text-left">Accepted Outgoing Request</h2>
   <div className="flex flex-col gap-4 max-w-full mx-auto">

                    {outAcceptedReq?.length > 0 ?
                        <ul className="w-full">
                            {outAcceptedReq.map((request) => (
                                <Card key={request.swap._id} className="mb-3 w-full max-w-xl mx-auto">
                                    <Card.Body>
                                        <Card.Title>Swap Request</Card.Title>

                                        <Card.Subtitle className="mb-2 text-muted">
                                            From: {request.swap.requester?.name}
                                        </Card.Subtitle>

                                        <Card.Text>
                                            <strong>Email:</strong> {request.swap.requester?.email} <br />
                                            <strong>They Offered:</strong> {request.swap.requesterService?.title} <br />
                                            <strong>Requested Your Service:</strong> {request.swap.recepientService?.title || request.swap.recepientService} <br />
                                            <strong>Status:</strong> {request?.swap?.status} <br />
                                            <strong>Date:</strong> {new Date(request.swap.createdAt).toLocaleString()}
                                        </Card.Text>
                                        <Button variant="success"
                                            className="me-2"
                                            onClick={() => navigate(`/chat/${request.chat.map((chat) => (
                                                chat._id
                                            ))}`)}
                                        >Go to Chats</Button>




                                    </Card.Body>
                                </Card>
                            ))}


                        </ul> :

                        <div className="text-white text-center"> No Request yet</div>
                    }
                </div>
                </div>
            </div>
        </>
    );
};

export default AcceptedReq;
