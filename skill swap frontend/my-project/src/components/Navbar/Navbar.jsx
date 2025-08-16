import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';


import React from 'react'


export const Header = () =>{
const navigate = useNavigate()
    const location = useLocation();
    const {user , logout} = useAuth();
    const isLanding = location.pathname === "/" ;

    const handleLogout = ()=>{
      const confirm = window.confirm("Are you sure You want to logout ?")
      if(confirm){
      logout();
      navigate("/login")
      }
    }
  return (
    <Navbar className="bg-body-tertiary mb-2 relative">
      <Container fluid>
        {/* Brand title aligned to the left */}
        <Navbar.Brand className="font-serif px-10">Skill Swap</Navbar.Brand>

        {/* Links and form pushed to the right using ms-auto */}
        {
user ?

        <Nav className="ms-auto align-items-center flex gap-3">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/services">Services</Nav.Link>
       <button onClick={handleLogout}>Logout</button>
          <Nav.Link className="" href="/discover" >Discover</Nav.Link>
          <Nav.Link  href="/swaprequests" >Swap Requests</Nav.Link>
          <Nav.Link  href="/notifications" ><div><Bell/></div></Nav.Link>
          <Nav.Link  href="/acceptedReq" ><div>Accepted REquest</div></Nav.Link>
          
          
        </Nav>
        : 
            <Nav className="ms-auto align-items-center flex gap-3">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/aboutus">About Us</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link className="mr-10" href="/signup">Register</Nav.Link>
          {/* <Nav.Link className="mr-10" onClick={handleLogout} >Logout</Nav.Link> */}
          
          
        </Nav>
}
      </Container>
    </Navbar>
  );

}

export default Header
