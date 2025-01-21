import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from '../pages/home';
import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ],
    },
    {
        path: "auth",
        element:  <AuthLayout />,
        children: [
            { path: "/auth/login", element: <Login /> },
            { path: "/auth/register", element: <Register /> },
            // { path: "/auth/forgot-password", element: <ForgotPassword /> },
        ],
    },
]);

export default router;