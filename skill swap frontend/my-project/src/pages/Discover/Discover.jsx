import React, { useEffect, useState } from 'react'
import Header from '../../components/Navbar/Navbar'
import { useAuth } from '../../context/AuthContext'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { User , Mail, ArrowUpRight} from 'lucide-react';
import UserProfileWrapper from '../Profile/UserProfileWrapper';
import { useNavigate } from 'react-router-dom';
function Discover() {
  const { user, token } = useAuth();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); // for pagination
  const [totalPages, setTotalPages] = useState(1);


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

const handleProfile = (id)=>{
  navigate(`/users/${id}`)
}

const handleAccept = async()=>{
  try {
    const res = await axios.post("http://localhost:8000/api/swap/create") // get the requestid that service you are providing by user to enter it through  input . 
  } catch (error) {
    
  }

}

  return (
    <>
      <Header />
      <div className='min-h-screen bg-[#4CAF50]'>
        <h1 className='p-3'>Swap Requests</h1>
        <div className=' ml-10 mr-10 '>

          <div className='flex flex-col gap-2'>

            {

            services.length > 0 && 

              services.map((service) => (
                <div key={service._id} >
                  <Card className="w-full max-w-xl flex flex-row">
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
                        <Button variant="success" onClick={handleAccept}>Accept</Button>
                    </Card.Body>
                    <div className='flex flex-col justify-center gap-2 text-md font-bold pr-2'>
                      <h4>Created by : </h4>
                    <div className='flex items-center gap-2 '>
                     <User/> : {service.user.name}
                    </div>
                    <div className='flex items-center gap-2'>
                     <Mail/> : {service.user.email}
                    </div>
                    <div className='flex flex-row items-center' >
                   <Button variant="secondary" onClick={()=> handleProfile(service.user._id)}>Profile</Button>
                        <div className='text-gray-500'><ArrowUpRight/></div>
                    </div>
                    </div>
                  </Card>
                </div>
              ))




}
            <div className='flex flex-row gap-2 mt-4 items-center mb-3'>

              <Button variant="secondary" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >Previous</Button>
 <span className="text-white">Page {currentPage} of {totalPages}</span>
              <Button variant="secondary" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >Next</Button>
            </div>
            {/* } */}

          </div>


        </div>



      </div>
    </>
  )
}

export default Discover
