import React, { useState, useEffect } from 'react'
import NavBar from '../user/home/navbar/navbar'
import './admindashboard.css'
import axios from 'axios'


const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:4000/admin");
                // console.log('Response received:', res.data.data);  // Log data to ensure it's correct
                if (res.data.success) {
                    setUsers(res.data.data);
                } else {
                    setError(res.data.message || 'Failed to fetch data');
                }
            } catch (e) {
                console.error('Error:', e);
                setError('An error occurred while fetching data');
            }
        };
        fetchUsers();
    }, []);
    useEffect(() => {
        console.log('Users updated:', users);
    }, [users]);

    return (
        <div className="buy-container">
            <NavBar className="nav-bar" />
            <div className='admin-main'>
                <div className='user-details'>
                    <h1>USERS</h1>
                    {error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        Array.isArray(users) && users.length > 0 ? (  // Ensure users is an array and has data
                            users.map((user, index) => (
                                <div key={index} className="user-card">
                                    <h2>{user.first_name} {user.last_name}</h2>
                                    <p><strong>City:</strong> {user.city}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Phone:</strong> {user.phone_number}</p>
                                    <p><strong>Games:</strong> {user.game_name || 'No Games Listed'}</p>
                                </div>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )
                    )}
                </div>
                <div className="right-container">
                    <div className='finance-details'></div>
                    <div className='transaction-history'></div>
                </div>
            </div>
        </div >
    );
}

export default AdminDashboard
