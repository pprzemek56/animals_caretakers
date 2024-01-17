import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
  };

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};