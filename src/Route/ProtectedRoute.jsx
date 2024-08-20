// components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute = ({ element: Element }) => {

  const location = useLocation();
  const authStatus = JSON.parse(localStorage.getItem('isAuth'));
  console.log('ProtectedRoute: Authentication Status:', authStatus); // Debugging log

  if (authStatus) {
    console.log('User is authenticated, rendering the component.');
    return Element;
  } else {
    console.log('User is not authenticated, redirecting to login.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
