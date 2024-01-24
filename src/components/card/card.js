import React, { useState, useEffect, useCallback } from 'react';
import './card.css';
import UserDetailPopup from './userDetailPopout'; // Import the UserDetailPopup component

function Card() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUserRole = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = decodeJWT(token);
    return decodedToken ? decodedToken.role : null;
  }, []);

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
            const fetchAdditionalInfo = getUserRole() === "Recruiter";

            const updatedUsers = await Promise.all(
              data.items.map(async (user) => {
                if (fetchAdditionalInfo) {
                  const userResponse = await fetch(`http://localhost:5129/api/employees/${user.id}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                  });

                  if (userResponse.ok) {
                    const user = await userResponse.json();
                    return { ...user, role: user.role, description: user.description };
                  }
                }

                return user;
              })
            );

            console.log('Updated Users:', updatedUsers); // Add this line for debugging
            setUsers(updatedUsers);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page, pageSize, getUserRole]);

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
  const handleUserClick = (user) => {
    if (getUserRole() === 'Recruiter') {
      setSelectedUser(user);
    }
  };

  const closeUserDetailPopup = () => {
    setSelectedUser(null);
  };


  return (
    <div>
      <div className='card-container py-12 mx-14'>
        {users.map(user => (
            <div className="user-card" key={user.id} onClick={() => handleUserClick(user)}>
              <div className="avatar-circle mb-4">
                {user.givenName[0]}{user.surname[0]}
              </div>
              <h2 className="user-name">{user.givenName} {user.surname}</h2>
              {user.expectedSalary &&<p className="user-role">Expected salary: {user.expectedSalary.value} PLN</p>}
              {user.successes && <p className="user-successes">Sukcesy: {user.successes.value}</p> }
            </div>
        ))}
        </div>
      <div className="buttons">
      <button onClick={() => setPage(page => Math.max(page - 1, 1))}>Previous</button>
      <button onClick={() => setPage(page => page + 1)}>Next</button>
      </div>
      {selectedUser && (
        <UserDetailPopup user={selectedUser} onClose={closeUserDetailPopup} />
      )}
    </div>
  );
}

export default Card;