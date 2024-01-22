import React, { useState, useEffect } from 'react';
import './card.css';

function Card() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5129/api/employees', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setUsers(data.items);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page, pageSize]);

  return (
    <div className='card-container py-12'>
      {users.map(user => (
          <div className="user-card" key={user.id}>
            <img src={user.avatar} alt="User Avatar" className="user-avatar" />
            <h2 className="user-name">{user.givenName} {user.surname}</h2>
            {/* <p className="user-role">{user.role}</p> */}
            {/* <p className="user-description">{user.description}</p> */}
          </div>
      ))}
      <button onClick={() => setPage(page => Math.max(page - 1, 1))}>Previous</button>
      <button onClick={() => setPage(page => page + 1)}>Next</button>
    </div>
  );
}

export default Card;