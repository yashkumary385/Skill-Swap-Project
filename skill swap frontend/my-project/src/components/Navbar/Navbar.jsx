import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../context/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { NavLink } from "react-router-dom";



export const Header = () =>{
const navigate = useNavigate()
    const {user , logout} = useAuth();

    const handleLogout = ()=>{
      const confirm = window.confirm("Are you sure You want to logout ?")
      if(confirm){
      logout();
      navigate("/login")
      }
    }
  return (
    <Navbar className="bg-body-tertiary mb-2 relative font-serif">
      <Container fluid>
        {/* Brand title aligned to the left */}
        <Navbar.Brand className="font-serif px-10">Skill Swap</Navbar.Brand>

        {/* Links and form pushed to the right using ms-auto */}
        {
user ?

<Nav className="ms-auto align-items-center flex gap-3">
<Nav.Link as={NavLink} to="/" end>
  Home
</Nav.Link>
<Nav.Link as={NavLink} to="/profile">
  Profile
</Nav.Link>
<Nav.Link as={NavLink} to="/services">
  Services
</Nav.Link>
<Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
  Logout
</Nav.Link>
<Nav.Link as={NavLink} to="/discover">
  Discover
</Nav.Link>
<Nav.Link as={NavLink} to="/swaprequests">
  Swap Requests
</Nav.Link>
<Nav.Link as={NavLink} to="/acceptedReq">
  <div>Your Requests</div>
</Nav.Link>
<Nav.Link as={NavLink} to="/notifications">
  <div><Bell /></div>
</Nav.Link>
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
