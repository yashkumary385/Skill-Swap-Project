import React, { useEffect, useState } from 'react'
import Header from '../../components/Navbar/Navbar'
import { useAuth } from '../../context/AuthContext'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
function Discover() {
  const { user, token } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => { // implement pagination tommorrow

    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/get/notUser", {
          headers: { Authorization: `Bearer ${token}` }
        })

        console.log(res)
        setServices(res.data.services);
      } catch (error) {
        console.log(error)
      }
    }
    fetchServices();
  }, [])

  return (
    <>
      <Header />
      <div className='min-h-screen bg-[#4CAF50]'>
        <h1 className='p-3'>Swap Requests</h1>
        <div className=' ml-10 mr-10 '>

          <div className='flex flex-col gap-2'>

            {services.length > 0 &&
              services.map((service) => (
                <div>
                  <Card className="w-full max-w-2xl ">
                    <Card.Body>
                      <Card.Title>{service.title}</Card.Title>
                      <Card.Text>
                        {service.description}
                      </Card.Text>
                      <Card.Text>
                        {service.cateogory}
                      </Card.Text>
                      <Card.Text>
                        {service.type}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                </div>))


            }

          </div>

        </div>



      </div>
    </>
  )
}

export default Discover
