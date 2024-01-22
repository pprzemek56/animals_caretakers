import React, {useState} from 'react';
import './navbar.css';
import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";
import {useAuth} from "../../AuthContext";

function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const { isLoggedIn, logout, login } = useAuth();
    const handleShowLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
      };

      const handleShowRegister = () => {
          setShowLogin(false);
          setShowRegister(true);
      };

      const handleClose = () => {
          setShowLogin(false);
          setShowRegister(false);
      };

    const handleLogout = () => {
        logout();
        handleClose(); // Close any open forms when logging out
    };
    const user = {
        name: "John",
        surname: "Pet Owner"
      };
    
      // Function to extract initials
      const getInitials = (name, surname) => {
        return `${name[0]}${surname[0]}`;
      };
    
      // User's initials
      const initials = getInitials(user.name, user.surname);

    return (
        <>
            {showLogin && <LoginForm onClose={handleClose} onSignUp={handleShowRegister} onLoginSuccess={login}/>}
            {showRegister && <RegisterForm onClose={handleClose} onLogIn={handleShowLogin} />}
            <nav class="navbar">
                <ul>
                    <a href="/" class="navbar-brand mr-auto ml-6"><img src="/logo.svg" alt="Caretakers" className="navbar-logo" /></a>
                    {!isLoggedIn && <li><a onClick={handleShowLogin} className="button">Log in</a></li>}
                    {isLoggedIn && (
                        <>
                            <div className="avatar-circle">
                            {initials}
                            </div>
                            <li><a onClick={handleLogout} className="button">Log out</a></li>
                            <li><a href="/profile" className="button">Profile</a></li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
