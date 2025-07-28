import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom';
import Profile from './Profile';

const UserProfileWrapper = () => {
    const { token } = useAuth();
    const { id } = useParams()
    const [user, setUser] = useState(null)
    useEffect(() => {
        const fetchUser = async () => {

            try {
                const res = await axios.get(`http://localhost:8000/get/other/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(res.data)
                console.log(res);
            } catch (error) {
                console.log(error)

            }

        }
        fetchUser()
    }, [id])


    return (
        <Profile externalUser={user} />
    )
}

export default UserProfileWrapper
