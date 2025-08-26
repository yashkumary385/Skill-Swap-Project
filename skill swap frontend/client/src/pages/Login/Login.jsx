import { useState } from "react";
import { useAuth } from '../../context/useAuth.js';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { forgotPassword } from "../../api/api.js";


const validateEmail = (email) => {
  // Regular expression for a basic email validation
  // It checks for:
  // ^[\w.-]+ : Starts with one or more word characters, dots, or hyphens
  // @ : Followed by an '@' symbol
  // [\w.-]+ : Then one or more word characters, dots, or hyphens (for the domain name)
  // \. : Followed by a dot
  // [A-Za-z]{2,}$: Ends with 2 or more letters (for the top-level domain)
  const re = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// const validatePassword = (password) => {
//   // Regular expression for password validation
//   // It checks for:
//   // (?=.*[a-z]) : At least one lowercase letter
//   // (?=.*[A-Z]) : At least one uppercase letter
//   // (?=.*\d) : At least one digit
//   // (?=.*[@$!%*?&]) : At least one special character from the set @$!%*?&
//   // [A-Za-z\d@$!%*?&]{8,} : Minimum of 8 characters, consisting of letters, digits, and the allowed special characters
//   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return re.test(password);
// };

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Email and Password are required!");
      return;
    }

    if (!validateEmail(email)) {
        toast.warning("Please enter a valid email address!");
        return;
    }

    // if (!validatePassword(password)) {
    //     toast.warning("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
    //     return;
    // }

    try {
      const result = await login(email, password)
      console.log(result);

      if (result.success) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred during login.");
      }
    }
  }
  const [passwordForm, setPasswordForm] = useState({
    email: "",
    password: "",
    password1: ""
  })

  const handlePasswordForm =async (e) => {
    e.preventDefault()
    try {
         const res = await forgotPassword(passwordForm.email,passwordForm.password,passwordForm.password1)
         console.log(res)
         setShowModal(false)
         toast.success(res.data.message)
    } catch (error) {
     console.log(error)
     toast.error(error.data)
    }
  }
  const handleModal = () => {
    setShowModal(true)
  }
  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen p-4"
        style={{ backgroundColor: "#4CAF50" }}
      >
        <div
          className="w-full max-w-sm p-6 rounded-lg shadow-md bg-[#F9FAFB] flex flex-col items-center gap-6"
        >
          <div className="text-2xl font-bold">Login</div>
          {/* Icon Centered */}
          <div className="flex justify-center items-center">
            <Lock className="w-6 h-6 text-gray-600" />
          </div>


          {/* Form Centered */}
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={handleLogin}
          >
            <div className="relative w-full">
              <div><Mail className="absolute top-2 left-2 w-6 h-6" /></div>

              <input
                type="email"
                className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <div><Lock className="absolute top-2 left-2 w-6 h-6" /></div>

              <input
                type="password"
                className="border-2 border-[#4CAF50] pl-12 pr-10 py-2 w-full rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" variant="outline-success" className="w-full py-2">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            Don't have an account? <Link to="/signup" className="text-[#4CAF50] font-bold">Sign Up</Link>
          </div>
          <div className="mt-4 text-center">
          Forgot Passord ? <Link onClick={handleModal} variant="success" className="text-[#4CAF50] font-bold">Reset Password</Link>
        </div>
        </div>
       
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered className="p-2">
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePasswordForm} className="flex flex-col gap-3 p-2">
            <input type="email"
              placeholder="Enter Your Email"
              value={passwordForm.email}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, email: e.target.value }))}
              className="border-2 border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input type="password"
              placeholder="Enter New Password"
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, password: e.target.value }))}
              value={passwordForm.password}
              className="border-2 border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            /> <input type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, password1: e.target.value }))}
              value={passwordForm.password1}
              className="border-2 border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-2 mt-3">
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              <Button variant="primary" type="submit">Update</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>


    </>

  )

}

export default Login;