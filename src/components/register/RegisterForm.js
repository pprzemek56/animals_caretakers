import React, {useState} from 'react';
import './RegisterForm.css';

function RegisterForm({ onClose, onLogIn }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    accountType: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch('http://localhost:5129/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
        onClose();
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="register-form-overlay" onClick={onClose}>
      <div className="register-form" onClick={handleFormClick}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
          <input type="text" placeholder="Surname" name="surname" value={formData.surname} onChange={handleChange} />
          <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          <div className="select-container">
            <select name="accountType" id="accountType" onChange={handleChange} value={formData.accountType || ""}>
              <option value="" disabled selected>Account Type</option>
              <option value={0}>Recruiter</option>
              <option value={1}>Employee</option>
            </select>
          </div>
          <button type="submit" >Sign up</button>
        </form>
        <p>
          Already have an account?
          <button onClick={onLogIn}>Log in</button>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;