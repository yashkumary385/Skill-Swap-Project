import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/useAuth.js';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import { userProfile } from '../../api/api.js';

const UserProfileWrapper = () => {
    const { token } = useAuth();
    const { id } = useParams()
    const [user, setUser] = useState(null)
    useEffect(() => {
        const fetchUser = async () => {

            try {
                const res = await userProfile(id);
               
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
