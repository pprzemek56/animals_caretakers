import React from 'react';
import './LoginForm.css';

function LoginForm({ onClose, onSignUp }) {

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="login-form-overlay" onClick={onClose}>
      <div className="login-form" onClick={handleFormClick}>
        <h2>Log In</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={onClose}>Log in</button>
        <p>
          Don't have an account yet?
          <button onClick={onSignUp}>Sign up</button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
