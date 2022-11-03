import React from 'react'
import { useLocation, Navigate } from 'react-router-dom';

function OnlyAuthUser({ children }) {
  const token = JSON.parse(localStorage.getItem("credentials"));
  const location = useLocation();

  if (!token || !token.isLoggedIn) {
    console.log("token is  false")
    return <Navigate to="/register" state={{ from: location }} replace />;

  }

  return children
}

export default OnlyAuthUser