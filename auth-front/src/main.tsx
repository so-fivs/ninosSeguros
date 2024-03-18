import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './routes/Login.tsx'
import Signup from './routes/signup.tsx'
import Directory from './routes/Directory.tsx'
import Protect from './routes/Protect.tsx'
import Authenti from './auth/Authenti.tsx'

const router = createBrowserRouter([

    {
        path: "*",
        element: <Login />,
    },
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/",
        element: < Protect />,
        children: [
            {
                path: "/directory",
                element: < Directory />,
            }
        ]
    },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Authenti>
          <RouterProvider router ={router} />
      </Authenti>
  </React.StrictMode>,
)
