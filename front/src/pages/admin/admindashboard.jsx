import React, { useState, useEffect } from 'react'
import NavBar from '../user/home/navbar/navbar'
import './admindashboard.css'
import axios from 'axios'

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [gamesCount, setGamesCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [purchases, setPurchases] = useState(0);
    const [rents, setRents] = useState(0);
    const [deliveries, setDeliveries] = useState(0);
    const [details, setDetails] = useState([]);
    const [deliveryStatus, setDeliveryStatus] = useState({
        shipped: 0,
        inTransit: 0,
        delivered: 0
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [AvailableGame, setAvailableGames] = useState(0);

    const removeDups = (userDetails) => {
        const groupedUsers = {};

        userDetails.forEach(user => {
            if (groupedUsers[user.user_id]) {
                if (!groupedUsers[user.user_id].games.includes(user.game_name)) {
                    groupedUsers[user.user_id].games.push(user.game_name);
                }
            } else {
                groupedUsers[user.user_id] = {
                    ...user,
                    games: [user.game_name]
                };
            }
        });

        return Object.values(groupedUsers);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:4000/admin");
                if (res.data.success) {
                    const totalDeliveries =
                        parseInt(res.data.shipped.rows[0].count, 10) +
                        parseInt(res.data.transit.rows[0].count, 10) +
                        parseInt(res.data.delivered.rows[0].count, 10);
                    setDeliveryStatus({
                        shipped: res.data.shipped.rows[0].count,
                        inTransit: res.data.transit.rows[0].count,
                        delivered: res.data.delivered.rows[0].count
                    });
                    setDeliveries(totalDeliveries);
                    setGamesCount(res.data.games.rows[0].count);
                    setPurchases(res.data.purchases.rows[0].count);
                    setRents(res.data.rents.rows[0].count);
                    setUserCount(res.data.data.length - 1); // to neglect the admin
                    setUsers(removeDups(res.data.data));
                    setDetails(res.data.details.rows)
                    setAvailableGames(res.data.AvailableGames.rows[0].count);
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

    const handleDelete = async (user_id) => {
        try {
            const res = await axios.delete(`http://localhost:4000/admin/${user_id}`);
            if (res.data.success) {
                setUsers((prevUsers) => prevUsers.filter(user => user.user_id !== user_id));
            } else {
                setError(res.data.message || 'Failed to delete user');
            }
        } catch (e) {
            console.error('Error deleting user:', e);
            setError('An error occurred while deleting the user');
        }
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="buy-container">
            <NavBar className="nav-bar" />
            <div className="admin-main">
                <div className="user-details">
                    <h1>USERS</h1>
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        className='search-by-name'
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            marginBottom: "1rem",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            width: "100%",
                        }}
                    />

                    {error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => {
                                if (user.email !== 'agha@iba') {
                                    return (
                                        <div key={index} className="user-card">
                                            <h2>{user.first_name} {user.last_name}</h2>
                                            <p><strong>City:</strong> {user.city}</p>
                                            <p><strong>Email:</strong> {user.email}</p>
                                            <p><strong>Phone:</strong> {user.phone_number}</p>
                                            <p>
                                                <strong>Games:</strong>
                                                {Array.isArray(user.games) && user.games.length > 0 ?
                                                    user.games.join(", ") : "No Games Listed"}
                                            </p>
                                            <button
                                                onClick={() => handleDelete(user.user_id)}
                                                className="delete-btn"
                                            >
                                                Delete User
                                            </button>
                                        </div>
                                    );
                                }
                                return null; // skip rendering of adminn
                            })
                        ) : (
                            <p>No users found.</p>
                        )

                    )}
                </div>
                <div className="right-container">
                    <div className="store-details">
                        <h3>Totals</h3>
                        <p> users <strong>:</strong> {userCount}</p>
                        <p>total games <strong>:</strong> {gamesCount}</p>
                        <p> Available Games <strong>:</strong> {AvailableGame}</p>
                        <p> purchases made <strong>:</strong> {purchases}</p>
                        <p> rentals <strong>:</strong> {rents}</p>
                        <details>
                            <summary>total deliveries <strong>:</strong> {deliveries}</summary>
                            <ul>
                                <li> shipped <strong>:</strong> {deliveryStatus.shipped}</li>
                                <li>In Transit <strong>:</strong> {deliveryStatus.inTransit}</li>
                                <li>delivered <strong>:</strong> {deliveryStatus.delivered}</li>
                            </ul>
                        </details>
                    </div>
                    <div className="transaction-history">
                        <h3 style={{ marginBottom: '10px' }}>Transaction Details</h3>
                        {details.length > 0 ? (
                            details.map((detail, index) => (
                                <div key={index} style={{ marginBottom: '5px' }} className="transaction-card">
                                    <p><strong>User:</strong> {detail.user_first_name} {detail.user_last_name}</p>
                                    <p><strong>Game:</strong> {detail.name}</p>
                                    <p><strong>Delivery Status:</strong> {detail.delivery_status}</p>
                                    <p><strong>Transaction Type:</strong> {detail.transaction_type}</p>
                                </div>
                            ))
                        ) : (
                            <p>No transactions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
