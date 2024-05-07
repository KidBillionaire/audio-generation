// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Adjust path based on your authentication context/provider

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access the authentication status

  if (!isAuthenticated) {
    // Redirect to the authentication page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  // Render the children (protected page) if authenticated
  return children;
};

export default ProtectedRoute;
