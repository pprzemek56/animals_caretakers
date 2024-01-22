import React from 'react';
import './card.css';

function Card() {
  const users = [
    { id: 1, name: 'User 1', role: 'Recruiter', avatar: 'avatar1.jpg', description: 'Description 1' },
    { id: 2, name: 'User 2', role: 'Recruiter', avatar: 'avatar2.jpg', description: 'Description 2' },
    { id: 3, name: 'Nigga', role: 'Recruiter', avatar: '/mainpage.webp', description: 'Desc'}
  ];
  return (
    <div className='card-container py-12'>
      {users.map(user => (
        user.role === 'Recruiter' && (
          <div className="user-card" key={user.id}>
            <img src={user.avatar} alt="User Avatar" className="user-avatar" />
            <h2 className="user-name">{user.name}</h2>
            <p className="user-role">{user.role}</p>
            <p className="user-description">{user.description}</p>
          </div>
        )
      ))}
    </div>
  );
}

export default Card;