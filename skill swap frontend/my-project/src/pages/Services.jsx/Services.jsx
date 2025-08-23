import React, { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Header from '../../components/Navbar/Navbar';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../context/useAuth.js';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const Services = () => {
  const { user, token } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    cateogory: "",
    type: ""
  })
  const [currentUpdateService, setCurrentUpdateService] = useState(null) // set this up  and procced tomorrwow set a state for current service to extract id out of it .
  const [services, setServices] = useState([]) // for the fetched service
  const [serviceUpdate, setServiceUpdate] = useState(false)
  const [servicesUpdateForm, setServicesUpdateForm] = useState({
    title: "",
    description: "",
    cateogory: "",
    type: ""
  })
  const [serviceId, setServiceId] = useState("")
  const serviceRef = useRef(null)
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getUserService/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res);
      setServices(res.data.services); // also to render services services here contain all the services 
      // console.log(services)
    } catch (error) {
      console.log(error)

    }
  }


  const handleService = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/service/create", {
        user: user._id,
        title: form.title,
        description: form.description,
        cateogory: form.cateogory,
        type: form.type
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log(res.data.createdService);
      setServices((prev) => ([...prev, res.data.createdService]))
      setForm({
        title: "",
        cateogory: "",
        description: "",
        type: ""
      })
      // console.log(services)
      fetchServices()
    } catch (error) {

      console.log(error)
      toast.warning("failed to create service")

    }
  }



  useEffect(() => {

    fetchServices();
  }, [])


  const handleEdit = (service) => {
    setServiceUpdate(true);
    setCurrentUpdateService(service);

    setServicesUpdateForm({
      title: service?.title || "",
      description: service?.description || "",
      cateogory: service?.cateogory || "",
      type: service?.type || ""
    })
    console.log(currentUpdateService)

  }


  const handleUpdate = async (currentUpdateservice) => {
    try {
      const res = await axios.put(`http://localhost:8000/updateService/${currentUpdateservice._id}`, {
        title: servicesUpdateForm.title,
        description: servicesUpdateForm.description,
        cateogory: servicesUpdateForm.cateogory,
        type: servicesUpdateForm.type
        // editForm
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res);
      fetchServices()
      setServices((prev) => [...prev, res.data.service]) // beacuse we are adding the service here
      toast.info("Service Updated Successfully");
      // useServices();
    } catch (error) {
      console.log(error)
      toast.warn("There was some error")

    }
    setServiceUpdate(false);
    setServicesUpdateForm({
      title: "",
      description: "",
      cateogory: "",
      type: ""
    })
    setCurrentUpdateService(null)
  }



  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/deleteService/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res);

      fetchServices()
    } catch (error) {
      console.log(error)

    }
  }
  const handleCopy = () => {
    const text = serviceRef.current.innerText;
    navigator.clipboard.writeText(text).then(() => toast.success("service id copied succesfully"))

  }
  return (
    <>
      <Header />
      <div className='h-[100vh] bg-[#4CAF50] flex justify-center items-center flex-col'>
        <h3 className='pb-4 border-2 border-black bg-gray-200 p-3 pt-4 rounded-lg'>Create Your Services You Want To Offer Here</h3>
        <div className='flex justify-center items-center flex-col h-[75vh] border-5 border-black rounded-2xl w-[30vw] bg-gray-200 text-black '  >
          <h1 className='mb-3'>Create Services</h1>

          <div>
            <Form.Group controlId="formFile" className="mb-3 ">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" className='border-2 border-black'
                onChange={(e) => setForm({ ...form, title: e.target.value })} value={form.title} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" className='border-2 border-black'
                onChange={(e) => setForm({ ...form, description: e.target.value })} value={form.description} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Cateogory</Form.Label>
              <Form.Control type="text" className='border-2 border-black'
                onChange={(e) => setForm({ ...form, cateogory: e.target.value })}
                value={form.cateogory} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Type</Form.Label>
              {/* <Form.Control type="" className='border-2 border-black'
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                value={form.type} /> */}
              <select id="myDropdown" name="mySelection" onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="request">Request</option>
                <option value="offer">Offer</option>
              </select>
            </Form.Group>

            <Button variant="outline-success" onClick={handleService}>Create request</Button>



          </div>
        </div>
      </div>

      <div id="down" className='flex flex-col bg-[#4CAF50] '>
        <Card style={{ width: '18rem' }} className='ml-10'>
          <Card.Body>
            <Card.Title>Your Services</Card.Title>
          </Card.Body>
        </Card>
        <div>
          <div className='flex flex-row gap-4'>
            <div className=' flex items-start  justify-start ml-10 mt-10 pt-4  flex-col border-2 border-black bg-gray-200 mr-10 pr-5'>
              <ul>

                { services.length > 0 ? (
                  services.map((service) => (
                    <li key={service._id}>
                      {/* <div>{service.title}</div> */}
                      <Card border="primary" style={{ width: '45rem' }} className='mt-10'>
                        <Card.Header>Service Type : {service.type}</Card.Header>
                        <Card.Body>
                          <Card.Title className='text-black'>Title : {service.title}</Card.Title>
                          <Card.Text>
                            Description : {service.description}
                          </Card.Text>
                          <Card.Text>
                            Cateogory : {service.cateogory}
                          </Card.Text>
                          <Card.Text >

                            Service Id : <span ref={serviceRef}> {service._id}</span>     <Button variant="success" onClick={() => handleCopy()}>Copy</Button>
                          </Card.Text>
                          <div className='flex flex-row gap-3'>
                            <div>
                              <Button variant="outline-success" onClick={() => handleEdit(service)}>Edit</Button>

                            </div>
                            <div>
                              <Button variant="outline-danger" onClick={() => handleDelete(service._id)}>Delete</Button>

                            </div>
                          </div>

                        </Card.Body>

                      </Card>
                    </li>
                  ))
                ) : (
                  <div>
                    <h3>No services found</h3>
                  </div>
                )}
              </ul>


            </div>
            {serviceUpdate &&

              <div >
                <h3 className='pb-4 border-2 border-black bg-gray-200 p-3 pt-4 rounded-lg'>Update Service</h3>
                <div className='flex justify-center items-center flex-col h-[70vh] border-5 border-black rounded-2xl w-[30vw] bg-gray-200 text-black '  >
                  <Form.Group controlId="formFile" className="mb-3 ">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" className='border-2 border-black'
                      onChange={(e) => setServicesUpdateForm({ ...servicesUpdateForm, title: e.target.value })} value={servicesUpdateForm.title} />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" className='border-2 border-black'
                      onChange={(e) => setServicesUpdateForm({ ...servicesUpdateForm, description: e.target.value })} value={servicesUpdateForm.description} />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cateogory</Form.Label>
                    <Form.Control type="text" className='border-2 border-black'
                      onChange={(e) => setServicesUpdateForm({ ...servicesUpdateForm, cateogory: e.target.value })}
                      value={servicesUpdateForm.cateogory} />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Type : </Form.Label>
                    {/* <Form.Control type="" className='border-2 border-black'
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                value={form.type} /> */}
                    <select id="myDropdown" value={servicesUpdateForm.type} onChange={(e) => setServicesUpdateForm({ ...servicesUpdateForm, type: e.target.value })}>
                      <option value="request">Request</option>
                      <option value="offer">Offer</option>
                    </select>
                  </Form.Group>

                  <Button variant="outline-success" onClick={() => handleUpdate(currentUpdateService)}>Complete</Button>
                </div>
              </div>
            }
          </div>



        </div>

      </div>



    </>
  )
}

export default Services
