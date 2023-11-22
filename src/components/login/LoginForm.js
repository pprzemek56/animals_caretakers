import React from 'react';
import './LoginForm.css';

function LoginForm({ onClose, onSignUp }) {

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="login-form-overlay" onClick={onClose}>
      <div className="login-form" onClick={handleFormClick}>
        <h2 class="mb-4">Log In</h2>
        <input type="email" class="pb-6" placeholder="Email" />
        <input type="password" class="pt-4" placeholder="Password" />
        <button onClick={onClose}>Log in</button>
        <p class="mb-5">
          Don't have an account yet?
        </p>
        <button onClick={onSignUp}>Sign up</button>
      </div>
    </div>
  );
}

export default LoginForm;
