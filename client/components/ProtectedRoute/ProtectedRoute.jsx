import React from 'react'
import App from '../../src/App'
import JoinScreen from '../../pages/JoinScreen'; 
import { Navigate } from "react-router";

function ProtectedRoute({children}) {
    const name = localStorage.getItem('name');
    if(!name){
        return <Navigate to="/home" />
    }
    
  return children
}

export default ProtectedRoute
