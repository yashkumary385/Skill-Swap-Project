import React from 'react'
import { Computer } from 'lucide-react'
import { Header } from '../../components/Navbar/Navbar'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup';
import { useAuth } from '../../context/useAuth.js';

export function LandingPage() {
  const {user} = useAuth();
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="min-h-[45vh] bg-[#4CAF50] flex items-center justify-start flex-col gap-3">
        <div className="w-[400px] bg-[#F9FAFB] flex flex-col items-center justify-center border-4 border-black text-bold mt-18">
          <p className="text-7xl font-serif pt-4">Skill Swap</p>
          <div className="text-4xl font-serif">
            <p>Pay With Your Skills</p>
          </div>
        </div>
      </div>
      <div className='bg-[#4CAF50] flex items-center justify-center pb-6'>
            <Card className="text-center">
      <Card.Body>
        <Card.Title>Hello {user?.name} 👋</Card.Title>
        <Card.Title>Hello {user?.email} 👋</Card.Title>

        <Card.Text>
Ready to swap skills and grow together?” 
</Card.Text>
      </Card.Body>
    </Card>

      </div>
      {/* About Us Section */}
      <div className="flex justify-start min-h-screen bg-[#4CAF50] pl-10 flex-col font-serif">
        <h1 className="mb-5">About Us</h1>

        <div className="font-bold text-lg mx-10 font-serif space-y-4">
          {/* Card 1 */}
          <Card style={{ width: '75rem' , backgroundColor: "#388E3C" }} className="mb-3 text-white"   border="success">
            <Card.Header>About Us</Card.Header>
            <Card.Body>
              <Card.Title>Skill Sharing</Card.Title>
              <Card.Text>
                Skill Swap is a community-driven platform where people exchange
                services based on their talents — no money involved. Whether
                you're a web developer who needs photography, a graphic designer
                who wants guitar lessons, or a language tutor looking for help
                with a website, Skill Swap lets you <strong>trade skills directly</strong>. We
                believe everyone has something valuable to offer — and
                collaboration is the new currency.
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Card 2 */}
          <Card style={{ width: '75rem' , backgroundColor: "#388E3C" }} className="mb-3 text-white"   border="success">
            <Card.Body>
              <Card.Title>Mutual Growth</Card.Title>
              <Card.Text>
                You can always show your worth as a human being and help fellow
                mates in exchange for a new set of skills.
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Card 3 */}
          <Card style={{ width: '75rem' , backgroundColor: "#388E3C" }} className="mb-3 text-white"   border="success">
            <Card.Body>
              <Card.Title>Community First</Card.Title>
              <Card.Text>
                Whether you're a coder seeking design help, a musician wanting
                to learn photography, or simply someone passionate about
                sharing knowledge, Skill Swap is the space where collaboration
                replaces currency. It's not just about services — it’s about
                building a community where talent, time, and passion are the new
                economy.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* Our Services */}
     {/* About Us Section */}
<div className="flex justify-start min-h-[70vh] bg-[#4CAF50] pl-10 flex-col font-serif">
  <h1 className="mb-5">Services Offered</h1>

  <CardGroup className="gap-3 ">
    {/* Card 1 */}
<Card
  className="mb-3 text-white"
  border="success"
  style={{ backgroundColor: "#388E3C" }} // darker green
>
      <Card.Header>Services</Card.Header>
      <Card.Body>
        <Card.Title>Skill Exchange</Card.Title>
        <Card.Text>
      Trade your talents directly with others. Whether it’s coding, teaching, photography, or design — swap skills without spending money.
        </Card.Text>
      </Card.Body>
    </Card>

    {/* Card 2 */}
<Card
  className="mb-3 text-white"
  border="success"
  style={{ backgroundColor: "#388E3C" }} // darker green
>      <Card.Header>Profiles & Requests</Card.Header>

  <Card.Body>
    <Card.Title>User Profiles </Card.Title>
    <Card.Text>
       Profiles to see their skills and requests. If you find a
      match, you can <strong>accept</strong> their request to start a skill
      exchange, or <strong>decline</strong> if it’s not the right fit. This
      ensures smooth, transparent, and personalized connections.
    </Card.Text>
  </Card.Body>
</Card>

    {/* Card 3 */}
<Card
  className="mb-3 mr-3 text-white"
  border="success"
  style={{ backgroundColor: "#388E3C" }} // darker green
>      <Card.Header>Seamless Connection</Card.Header>

    <Card.Body>
      <Card.Title>Get Connected</Card.Title>
      <Card.Text>
       Chat With People With Whom You Swap Your Skills With Real Time Chat .
      </Card.Text>
    </Card.Body>
  </Card>
  </CardGroup>
</div>

    </>
  )
}

export default LandingPage
