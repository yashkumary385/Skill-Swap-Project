import React, { useEffect, useState } from 'react';
import Header from '../../components/Navbar/Navbar';
import Card from 'react-bootstrap/Card';
import { notification } from '../../api/api.js';


const NotificationPage = () => {
  // Dummy notifications for layout demo
  const [notifications , setNotifications] = useState([]);

  useEffect(()=>{
      const notify = async()=>{
    try {
        const res = await notification()
        setNotifications(res.data.notification)
        console.log(res);
    } catch (error) {
        console.log(error)
    }
  } 
  notify()
  },[])



  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#4CAF50] p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center sm:text-left">Notifications</h1>

        <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
          
{ notifications.length > 0 ?
<ul>
        {notifications.map((note) => (
  <Card key={note._id} className="mb-3 w-full">
    <Card.Body>
      <Card.Text className="text-black">
        {note.message}
      </Card.Text>
      <Card.Subtitle className="text-muted text-end text-sm">
        {new Date(note.createdAt).toLocaleDateString()}
      </Card.Subtitle>
    </Card.Body>
  </Card>
))}

           
            </ul>:
            <div className="text-white text-center">No Notifications To Show</div>
}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
