// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';

// Create an authentication context
const AuthContext = createContext();

// Create a custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  // Set initial state to true to simulate authentication being turned off
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Simulate login function that always authenticates successfully
  const login = (username, password) => {
    // Log to verify login attempts
    console.log(`Login attempt with username: ${username}`);
    setIsAuthenticated(true);
  };

  // Standard logout function
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
