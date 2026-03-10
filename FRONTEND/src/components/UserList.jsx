import React, { useState, useEffect } from 'react'
import User from './User'

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:5000/user-api/users');
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.users);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                users.map(user => <User key={user._id} user={user} />)
            )}
        </div>
    );
}

export default UserList