import React, {useState} from 'react';
import './RegisterForm.css';

function RegisterForm({ onClose, onLogIn }) {
  const [formData, setFormData] = useState({
    givenName: '',
    surname: '',
    username: '',
    password: '',
    userType: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.givenName.trim()) errors.givenName = 'Name is required.';
    if (!formData.surname.trim()) errors.surname = 'Surname is required.';
    if (!formData.username.trim()) errors.username = 'Username is required.';
    if (!formData.password) errors.password = 'Password is required.';
    if (!formData.userType) errors.userType = 'Account type is required.';

    setFormErrors(errors);
    
    if (errors) {
      console.log(errors);
      return Object.keys(errors).length === 0;
    } else {
      return 1; // formularz przeszedl walidacje
    }
  };

  const registerUser = async (formData) => {
    formData.userType = Number(formData.userType);

    try {
      const response = await fetch('http://localhost:5129/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 202) {
        console.log('User registered successfully');
        alert('Pomyślnie zarejestrowano użytkownika');
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData.errors));
      }
    }
    catch (error) {
      console.error('Error during registration', error);
      const errorMessages = Object.values(JSON.parse(error.message));
      setServerErrors(errorMessages); // informacje bledu z serwera

      setTimeout(() => {
        setServerErrors([]);  // usun błędy serwera po 8 sekundach
      }, 8000);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      registerUser(formData);
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
          {formErrors.givenName && <label className="error">{formErrors.givenName}</label>}
          <input type="text" placeholder="Name" name="givenName" value={formData.givenName} onChange={handleChange} />
          {formErrors.surname && <label className="error">{formErrors.surname}</label>}
          <input type="text" placeholder="Surname" name="surname" value={formData.surname} onChange={handleChange} />
          {formErrors.username && <label className="error">{formErrors.username}</label>}
          <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
          {formErrors.password && <label className="error">{formErrors.password}</label>}
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          <div className="select-container">
            {formErrors.userType && <label className="error">{formErrors.userType}</label>}
            <select name="userType" id="userType" onChange={handleChange} value={formData.userType || ""}>
              <option value="" disabled>Account Type</option>
              <option value={0}>Recruiter</option>
              <option value={1}>Employee</option>
            </select>
          </div>
          <button type="submit">Sign up</button>

          {/* Wyswietlenie opisu bledu z serwera */}
          {Object.values(serverErrors).flat().map((error, index) => (
            <p key={index} className="error">{error}</p>
          ))}

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