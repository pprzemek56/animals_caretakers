import React, {useState} from 'react';
import './RegisterForm.css'; // You will create this CSS file

function RegisterForm({ onClose, onLogIn }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

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
        // Successfully registered
        console.log('User registered successfully');
        onClose(); // Close the form upon successful registration
      } else {
        // Handle errors (e.g., user already exists, server error)
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
          {/*<input type="email" placeholder="Email" />*/}
          {/*<input type="password" placeholder="Repeat Password" />*/}
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