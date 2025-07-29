import React, { useEffect, useState } from 'react'
import Header from '../Navbar/Navbar'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const SwapRequest = () => {
    const [outReq, setOutReq] = useState([])
    const [incomingReq, setIncomingtReq] = useState([])
    const { token } = useAuth();
    const [acceptedReq, setAcceptedReq] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // for pagination
    const [totalPages, setTotalPages] = useState(1);
    const handleIncomingRequest = async () => {
        try {
            const res = await axios.get("http://localhost:8000/requests/incoming",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(res);
            setIncomingtReq(res.data.incomingReq)
        } catch (error) {

        }
    }
    useEffect(() => {

        handleIncomingRequest()
    }, [])

    useEffect(() => {
        const handleOutgoingRequest = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/outRequest/outgoing?limit=3&page=${currentPage}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(res);
                setOutReq(res.data.outgoingReq)
                setTotalPages(res.data.totalPages)
            } catch (error) {

                console.log(error)
            }
        }
        handleOutgoingRequest()
    }, [currentPage])

    const handleAccept = async (id) => {
        console.log(id);
        try {
            const res = await axios.put(`http://localhost:8000/update/${id}`, {
                status: "rejected"
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            console.log(res);
            console.log(res.data.swap);
            toast.success("Swap Accepted")
            setAcceptedReq((prev) => [...prev, res.data.swap._id])
            handleIncomingRequest()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <div className='min-h-screen bg-[#4CAF50] flex flex-row'>
                <div id="left" className='w-[50vw] mt-10' >
                    <div className='flex items-center justify-center'>
                    <div className='flex flex-col h-[85vh] border-4 border-black rounded-2xl w-[40vw] bg-gray-200 text-black gap-3 overflow-y-auto p-4'>
                            <h1 className='pt-3'>Incoming Requests</h1>
                            <ul>
                                {
                                    incomingReq.map((request) => (
                                        <li key={request._id}>
                                            <Card style={{ width: '18rem' }} className="mb-4">
                                                <Card.Body>
                                                    <Card.Title>Swap Request</Card.Title>

                                                    <Card.Subtitle className="mb-2 text-muted">
                                                        From: {request.requester.name}
                                                    </Card.Subtitle>

                                                    <Card.Text>
                                                        <strong>Email:</strong> {request.requester.email} <br />
                                                        <strong>They Offered:</strong> {request.requesterService.title} <br />
                                                        <strong>Requested Your Service:</strong> {request.recepientService.title || request.recepientService} <br />
                                                        <strong>Status:</strong> {request.status} <br />
                                                        <strong>Date:</strong> {new Date(request.createdAt).toLocaleString()}
                                                    </Card.Text>


                                                    <Button variant="success"
                                                        disabled={acceptedReq.includes(request._id)}
                                                        className="me-2"
                                                        onClick={() => handleAccept(request._id)}

                                                    >Accept</Button>
                                                    <Button variant="danger"
                                                        disabled={acceptedReq.includes(request._id)}
                                                    >Reject</Button>

                                                </Card.Body>
                                            </Card>


                                        </li>
                                    ))
                                }
                            </ul>
                        </div>


                    </div>
                </div>
                <div id="right" className='mt-10 w-[50vw] flex justify-center'>
                    <div className='flex flex-col h-[85vh] border-4 border-black rounded-2xl w-[40vw] bg-gray-200 text-black gap-3 overflow-y-auto p-4'>
                        <h1 className='pt-3 text-center'>Outgoing Requests</h1>
                        <ul className="space-y-4">
                            {
                                outReq.map((request) => (
                                    <li key={request._id}>
                                        <Card className="w-full">
                                            <Card.Body>
                                                <Card.Title>Swap Request</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    From: {request.requester.name}
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    <strong>They Offered:</strong> {request.requesterService.title} <br />
                                                    <strong>Requested Your Service:</strong> {request.recepientService.title || request.recepientService} <br />
                                                    <strong>Status:</strong> {request.status} <br />
                                                    <strong>Date:</strong> {new Date(request.createdAt).toLocaleString()}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </li>
                                ))
                            }
                            <div className="flex flex-row gap-2 mt-4 items-center mb-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <span className="text-white">Page {currentPage} of {totalPages}</span>
                                <Button
                                    variant="secondary"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SwapRequest
