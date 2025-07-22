import React from 'react'
import { Computer } from 'lucide-react'
import { Header } from '../../components/Navbar/Navbar';

import Card from 'react-bootstrap/Card';

export function LandingPage() {
  return (
    <>
     <Header/>
    <div className='min-h-[100vh] bg-[#4CAF50] flex items-center justify-center flex-col gap-3'>
      <div className='w-[400px]  bg-[#F9FAFB] flex flex-col items-center justify-center border-4 border-black text-bold'>
        <p className='text-7xl font-serif  '>Skill Swap</p>
        <div className='text-4xl font-serif text- '>
          <p>Pay With Your Skills</p>
        </div>
      </div>
      <div className='flex items-center flex-row justify-between'>
          <div>
        <Card style={{ width: '18rem' }} className='mx-3'>
          <Card.Img variant="top"   src="/images/humans.png"
 />
          <Card.Body>
            <Card.Title>Always</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>

      </div>
          <div>
        <Card style={{ width: '18rem', height:"20rem"}} className='mx-3'>
          <Card.Img variant="top"   src="/images/humans3.png"
 />
          <Card.Body>
            <Card.Title>Learn New</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>

      </div>
          <div>
        <Card style={{ width: '18rem' }} className='mx-3'>
          <Card.Img variant="top"   src="/images/humans2.png"
 />
          <Card.Body>
            <Card.Title>Skills</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>

      </div>
      </div>

    </div>
  </>

  )
}

export default LandingPage


