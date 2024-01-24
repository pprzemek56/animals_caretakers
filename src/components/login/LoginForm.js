import React, {useState} from 'react';
import './LoginForm.css';

export const attachTokenToRequest = (url, options = {}) => {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }
  return fetch(url, options);
};
function LoginForm({ onClose, onSignUp, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = 'Username is required.';
    if (!formData.password) errors.password = 'Password is required.';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Validation errors:', formErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5129/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('User login successfully');
        onLoginSuccess();
        window.location.reload();
        onClose();
      } else {
        console.error('Failed to login user');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className="login-form-overlay" onClick={onClose}>
      <div className="login-form" onClick={handleFormClick}>
        <h2 class="mb-4">Log In</h2>
        <form onSubmit={handleLogin}>
          {formErrors.username && <label className="error">{formErrors.username}</label>}
          <input type="text" className="pb-6" placeholder="Username" name="username" value={formData.username} onChange={handleChange}/>
          {formErrors.password && <label className="error">{formErrors.password}</label>}
          <input type="password" className="pt-4" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
          <button type="submit">Log in</button>
        </form>
        <p class="mb-5">
          Don't have an account yet?
        </p>
        <button onClick={onSignUp}>Sign up</button>
      </div>
    </div>
  );
}

export default LoginForm;
