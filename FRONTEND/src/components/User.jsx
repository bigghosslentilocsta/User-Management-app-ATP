import React from 'react'

function User({ user }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '12px', marginBottom: '10px' , marginTop: '10px' }}>
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile:</strong> {user.mobileNumber}</p>
      <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
    </div>
  )
}

export default User