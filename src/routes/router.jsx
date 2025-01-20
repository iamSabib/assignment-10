import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from '../pages/home';
import HomeLayout from '../layouts/HomeLayout';

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
]);

export default router;