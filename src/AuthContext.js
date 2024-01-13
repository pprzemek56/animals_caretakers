import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

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