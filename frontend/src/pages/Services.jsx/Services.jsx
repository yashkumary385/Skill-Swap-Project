import React, { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Header from '../../components/Navbar/Navbar';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../context/useAuth.js';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createService, deleteService, fetchMyServices, updateService } from '../../api/api.js';

const Services = () => {
  const { user } = useAuth();
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
  
  const serviceRef = useRef(null)
  const fetchServices = async () => {
    try {
      const res = await fetchMyServices()
      console.log(res);
      setServices(res.data.services); // also to render services services here contain all the services 
      // console.log(services)
    } catch (error) {
      console.log(error)

    }
  }


  const handleService = async () => {
    try {
      const res = await createService(user._id,form.title,form.description,form.cateogory,form.type)
      // console.log(res.data.createdService);
      setServices((prev) => ([...prev, res.data.createdService]))
      setForm({
        title: "",
        cateogory: "",
        description: "",
        type: ""
      })
      // console.log(services)
      toast.success("Service Created Succesfully")
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


  const handleUpdate = async (currentUpdateService) => {
    try {
      const res = await updateService(currentUpdateService._id,{
        title: servicesUpdateForm.title,
        description: servicesUpdateForm.description,
        cateogory: servicesUpdateForm.cateogory,
        type: servicesUpdateForm.type
        // editForm
    })
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
      const res = await deleteService(id)
    
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
      <div className='min-h-screen bg-[#4CAF50] flex justify-center items-center flex-col p-4'>
        <h3 className='pb-4 border-2 border-black bg-gray-200 p-3 pt-4 rounded-lg text-center text-xl md:text-2xl mb-4'>Create Your Services You Want To Offer Here</h3>
        <div className='flex justify-center items-center flex-col h-auto border-5 border-black rounded-2xl w-full max-w-md bg-gray-200 text-black p-4'  >
          <h1 className='mb-3 text-2xl'>Create Services</h1>

          <div className="w-full">
            <Form.Group controlId="formFile" className="mb-3 ">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" className='border-2 border-black w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]'
                onChange={(e) => setForm({ ...form, title: e.target.value })} value={form.title} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} className='border-2 border-black w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]'
                onChange={(e) => setForm({ ...form, description: e.target.value })} value={form.description} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Cateogory</Form.Label>
              <Form.Control type="text" className='border-2 border-black w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]'
                onChange={(e) => setForm({ ...form, cateogory: e.target.value })}
                value={form.cateogory} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Type</Form.Label>
              <select id="myDropdown" name="mySelection" onChange={(e) => setForm({ ...form, type: e.target.value })} className="border-2 border-black w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                <option value="">Select Type Of Request</option>
                <option value="request">Request</option>
                <option value="offer">Offer</option>
              </select>
            </Form.Group>

            <Button variant="outline-success" onClick={handleService} className="w-full py-2">Create request</Button>



          </div>
        </div>
      </div>

      <div id="down" className='flex flex-col bg-[#4CAF50] p-4'>
        <Card style={{ width: '100%', maxWidth: '18rem' }} className='mx-auto mb-4'>
          <Card.Body>
            <Card.Title className="text-black text-center">Your Services</Card.Title>
          </Card.Body>
        </Card>
        <div className='flex flex-col md:flex-row gap-4 justify-center items-start'>
          <div className='w-full md:w-1/2 flex items-start justify-center md:justify-start pt-4 px-4 flex-col border-2 border-black bg-gray-200 rounded-lg'>
            <ul>

              { services.length > 0 ? (
                services.map((service) => (
                  <li key={service._id} className="w-full mb-4">
                    <Card border="primary" className="mt-4 w-full max-w-md mx-auto">
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

                          Service Id : <span ref={serviceRef}> {service._id}</span>     <Button variant="success" onClick={() => handleCopy()} className="ml-2">Copy</Button>
                        </Card.Text>
                        <div className='flex flex-col sm:flex-row gap-3 mt-3'>
                          <div>
                            <Button variant="outline-success" onClick={() => handleEdit(service)} className="w-full sm:w-auto">Edit</Button>

                          </div>
                          <div>
                            <Button variant="outline-danger" onClick={() => handleDelete(service._id)} className="w-full sm:w-auto">Delete</Button>

                          </div>
                        </div>

                      </Card.Body>

                    </Card>
                  </li>
                ))
              ) : (
                <div className="text-black text-center w-full py-4">
                  <h3>No services found</h3>
                </div>
              )}
            </ul>


          </div>
          {serviceUpdate &&

            <div className="w-full md:w-1/2 flex flex-col items-center pt-4">
              <h3 className='pb-4 border-2 border-black bg-gray-200 p-3 pt-4 rounded-lg text-center text-xl md:text-2xl mb-4'>Update Service</h3>
              <div className='flex justify-center items-center flex-col h-auto border-5 border-black rounded-2xl w-full max-w-md bg-gray-200 text-black p-4'  >
                <Form.Group controlId="formFile" className="mb-3 w-full ">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" className='border-2 border-black w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]'
                    onChange={(e) => setServicesUpdateForm({ ...servicesUpdateForm, title: e.target.value })} value={servicesUpdateForm.title} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3 w-full">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} className='border-2 border-black w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]'
                    onChange={(e) => setServicesUpdateForm({ ...servicesUpdateForm, description: e.target.value })} value={servicesUpdateForm.description} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3 w-full">
                  <Form.Label>Cateogory</Form.Label>
                  <Form.Control type="text" className='border-2 border-black w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]'
                    onChange={(e) => setServicesUpdateForm({ ...servicesUpdateForm, cateogory: e.target.value })}
                    value={servicesUpdateForm.cateogory} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3 w-full">
                  <Form.Label>Type : </Form.Label>
                  <select id="myDropdown" value={servicesUpdateForm.type} onChange={(e) => setServicesUpdateForm({ ...servicesUpdateForm, type: e.target.value })} className="border-2 border-black w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                    <option value="request">Request</option>
                    <option value="offer">Offer</option>
                  </select>
                </Form.Group>

                <Button variant="outline-success" onClick={() => handleUpdate(currentUpdateService)} className="w-full py-2">Complete</Button>
              </div>
            </div>
          }
        </div>



      </div>



    </>
  )
}

export default Services
