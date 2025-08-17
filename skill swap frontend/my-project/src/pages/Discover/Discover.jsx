import React, { useEffect, useState } from 'react'
import Header from '../../components/Navbar/Navbar'
import { useAuth } from '../../context/useAuth.js';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { User, Mail, ArrowUpRight } from 'lucide-react';
import { toast } from 'react-toastify';
import UserProfileWrapper from '../Profile/UserProfileWrapper';
import { useNavigate } from 'react-router-dom';
function Discover() {
  const { user, token } = useAuth();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();


  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [totalPages, setTotalPages] = useState(1);
  const [accept, setAccept] = useState(false);
  const [recepientId, setRecepientId] = useState("")
  const [requesterId, setRequesterId] = useState("")

  const [requestedServices, setRequestedServices] = useState([])
  const [myServices, setMyServices] = useState([]);

  useEffect(() => {

    const fetchMyServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/getUserService/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyServices(res.data.services);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyServices();
  }, []);

  useEffect(() => { // implement pagination tommorrow
    console.log("services fetch");
    const fetchServices = async () => {

      try {
        const res = await axios.get(`http://localhost:8000/get/notUser?limit=5&page=${currentPage}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        console.log(res)
        setServices(res.data.Notservices);
        setTotalPages(res.data.totalPages) // stores the total number of pages 
      } catch (error) {
        console.log(error)
      }
    }
    fetchServices();
  }, [currentPage])

  const handleProfile = (id) => {
    navigate(`/users/${id}`)
  }

  const handleAccept = async (id) => {
    setRecepientId(id);
    console.log(id)
    setAccept(true)
    // console.log(recepientId);
  }

  // console.log(requesterId) // requester is my id because i am making a request 
  // console.log(recepientId)

  const handleRequest = async () => {
    console.log()
    try {
      const res = await axios.post("http://localhost:8000/api/swap/create", {
        requesterServiceId: requesterId,
        recepientServiceId: recepientId, // both the services are being checked it you have made swap for a service you cant make swap for  it again 
        status: "pending"

      },
        {
          headers: { Authorization: `Bearer ${token}` }

        }

      )
      setRequestedServices((prev) => [...prev, recepientId]);
      console.log(res);
      toast.success("Swap Created Succesfully")
    } catch (error) {
      console.log(error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong while creating the swap.");
      }

    }

  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#4CAF50] flex px-10 pt-5 gap-8">
        {/* Left side - Services List */}
        <div className="w-[65%]">
          <h1 className="text-3xl font-bold text-white mb-4">Swap Requests</h1>

          <div className="flex flex-col gap-4">
            {services.length > 0 &&
              services.map((service) => (
                <div key={service._id}>
                  <Card className="w-full max-w-xl flex flex-row">
                    <Card.Body>
                      <Card.Title>{service.title}</Card.Title>
                      <Card.Text>{service.description}</Card.Text>
                      <Card.Text>{service.cateogory}</Card.Text>
                      <Card.Text>{service.type}</Card.Text>
                      <div className="flex gap-2">
                        <Button variant={requestedServices.includes(service._id) ? "secondary" : "success"}
                          disabled={requestedServices.includes(service._id)} onClick={() => handleAccept(service._id)}>{requestedServices.includes(service._id) ? "Requested" : "Accept"}</Button>
                      </div>
                    </Card.Body>
                    <div className="flex flex-col justify-center gap-2 text-md font-bold pr-2">
                      <h4>Created by :</h4>
                      <div className="flex items-center gap-2">
                        <User /> : {service.user.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail /> : {service.user.email}
                      </div>
                      <div className="flex flex-row items-center">
                        <Button variant="secondary" onClick={() => handleProfile(service.user._id)}>Profile</Button>
                        <div className="text-gray-500">
                          <ArrowUpRight />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}

            {/* Pagination */}
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
          </div>
        </div>

        {/* Right side - Info Panel */}
        <div className="w-[30%] pt-14">
{ accept && <>
          <div className=" p-4 rounded-xl  text-white text-left w-full">
            <Card className="text-center bg-gray-200 text-black" style={{ height: "400px" }}>
              <Card.Header >Service Swap</Card.Header>
              <Card.Body>
                <Card.Title>Create Swap Request</Card.Title>
                <Card.Text>
                  Enter the Service Id of your request for which you want to swap :
                </Card.Text>
                <div className='flex flex-col justify-center items-center gap-2'>
                  <select
                    onChange={(e) => setRequesterId(e.target.value)}
                    className="border-2 border-black w-3/4 pl-2 text-black"
                  >
                    <option value="">Select your service</option>
                    {myServices.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.title}
                      </option>
                    ))}
                  </select>

                  <Button variant="primary" className='w-1/2' onClick={handleRequest}>Create Request</Button>
                </div>
              </Card.Body>
              {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}

            </Card>
          </div>
        </>  }
        </div>
      </div>
    </>
  );
}

export default Discover
