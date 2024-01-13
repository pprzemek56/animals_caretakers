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
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.surname.trim()) errors.surname = 'Surname is required.';
    if (!formData.username.trim()) errors.username = 'Username is required.';
    if (!formData.password) errors.password = 'Password is required.';
    if (!formData.accountType) errors.accountType = 'Account type is required.';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (!validateForm()) {
      console.log('Validation errors:', formErrors);
      return;
    }

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
          {formErrors.name && <label className="error">{formErrors.name}</label>}
          <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
          {formErrors.surname && <label className="error">{formErrors.surname}</label>}
          <input type="text" placeholder="Surname" name="surname" value={formData.surname} onChange={handleChange} />
          {formErrors.username && <label className="error">{formErrors.username}</label>}
          <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
          {formErrors.password && <label className="error">{formErrors.password}</label>}
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          <div className="select-container">
            {formErrors.accountType && <label className="error">{formErrors.accountType}</label>}
            <select name="accountType" id="accountType" onChange={handleChange} value={formData.accountType || ""}>
              <option value="" disabled>Account Type</option>
              <option value="0">Recruiter</option>
              <option value="1">Employee</option>
            </select>
          </div>
          <button type="submit">Sign up</button>
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