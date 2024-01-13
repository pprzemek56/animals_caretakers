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

    return (
        <>
            {showLogin && <LoginForm onClose={handleClose} onSignUp={handleShowRegister} onLoginSuccess={login}/>}
            {showRegister && <RegisterForm onClose={handleClose} onLogIn={handleShowLogin} />}
            <nav className="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    {!isLoggedIn && <li><a onClick={handleShowLogin} className="button">Log in</a></li>}
                    {isLoggedIn && (
                        <>
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
