import React, { Suspense, useState, useEffect } from 'react';
import './navbar.css';
import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";
import {useAuth} from "../../AuthContext";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const { isLoggedIn, logout, login } = useAuth();
    const [user, setUser] = useState({givenName: '', surname: ''});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let handler = (e) => {
            if (!e.target.closest('.dropdown-menu')) {
                setOpen(false);
            }
        }
    
        document.addEventListener("mousedown", handler);
    
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
        if (token){
            try {
                const response = await fetch('http://localhost:5129/api/employees/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                      },
                });
                if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        console.log(data); // Log the response data
                        setUser({
                            givenName: data.givenName,
                            surname: data.surname}

                            );
                    }
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
    };
    fetchUser();
    }, []);

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
        handleClose();
        setOpen(false);
        window.location.reload();
    };


    return (
        <>
            {showLogin && <LoginForm onClose={handleClose} onSignUp={handleShowRegister} onLoginSuccess={login} />}
            {showRegister && <RegisterForm onClose={handleClose} onLogIn={handleShowLogin} />}
            <nav className="navbar">
                <ul>
                    <a href="/" className="navbar-brand mr-auto ml-6"><img src="/logo.svg" alt="Caretakers" className="navbar-logo" /></a>
                    {!isLoggedIn && <li><a onClick={handleShowLogin} className="button">Log in</a></li>}
                    {isLoggedIn && (
                        <>
                        <div className='menu-container'>
                            <Suspense fallback={<div>...</div>}>
                            <div className="avatar-circle scale-75" onClick={() => {
                            setOpen(!open);
                            }}>
                            {user.givenName[0]}{user.surname[0]}
                            </div>
                            </Suspense>
                            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                                <ul className="flex-col mr-0 pr-0">
                                    <DropdownItem leftIcon="👤" href="/profile" text={`Profile`}></DropdownItem>
                                    <DropdownItem leftIcon="📝" href="/profile" text={`Meetings`}></DropdownItem>
                                    <DropdownItem onClick={handleLogout} href="/" leftIcon="🔒" text={`Logout`}></DropdownItem>

                                </ul>
                                {/* 
                                <li><a href="/profile" className="button">Profile</a></li> */}
                            </div>
                        </div>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};


function DropdownItem(props) {
    const handleClick = (event) => {
        event.stopPropagation();
        if (props.onClick) {
            props.onClick();
        }
    };
    return (
        <li className="dropdownItem">
            <Link to={props.href} className="icon-button" onClick={handleClick}>
                <span className="icon-left">{props.leftIcon} {props.text}</span>
            </Link>
        </li>
    );
}

export default Navbar;
