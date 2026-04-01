import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from "react-router";
import JoinScreen from '../pages/JoinScreen.jsx';

const router =createBrowserRouter([
   { path: "/", element: <App /> },
   {path:"/home",element:<JoinScreen/>}

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/> 
  </StrictMode>,
)
