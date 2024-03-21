import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './routes/Login.tsx'
import Signup from './routes/signup.tsx'
import Perfil from './routes/perfil.tsx'
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
            },
            {
                path: "/perfil",
                element: < Perfil />,
            },
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
