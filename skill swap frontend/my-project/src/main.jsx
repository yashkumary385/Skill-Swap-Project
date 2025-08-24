import { createRoot } from 'react-dom/client'
import './index.css'
// import {App} from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastContainer, Bounce } from 'react-toastify'
import { router } from './App.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        
        <RouterProvider router={router} />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />

    </AuthProvider>

)
