import React from 'react';
import './RegisterForm.css'; // You will create this CSS file

function RegisterForm({ onClose, onLogIn }) {

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="register-form-overlay" onClick={onClose}>
      <div className="register-form" onClick={handleFormClick}>
        <h2>Sign Up</h2>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Surname" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Repeat Password" />
        <button onClick={onClose}>Sign up</button>
        <p>
          Already have an account?
          <button onClick={onLogIn}>Log in</button>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;