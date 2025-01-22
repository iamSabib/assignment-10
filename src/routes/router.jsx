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
import PrivateRoute from './PrivateRoute';
import Addmovies from '../pages/Addmovies';
import Favmovies from '../pages/Favmovies';
import Allmovies from '../pages/Allmovies';
import Faq from '../pages/Faq';
import Page404 from '../pages/Page404';
import Detailsmovie from '../pages/Detailsmovie';


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
                // https://assignment-10-server-one-coral.vercel.app/getfeaturemovies
                loader: () => fetch('https://assignment-10-server-one-coral.vercel.app/getfeaturemovies')
            },
            { 
                path: "/allmovies", 
                element: <Allmovies />, 
                loader: () => fetch('https://assignment-10-server-one-coral.vercel.app/allmovies') 
            },
            { path: "/faq", element: <Faq /> }
        ],
    },
    {
        path: "/movies",
        element: (
        <PrivateRoute>
            <HomeLayout />
        </PrivateRoute>
        ),
        children: [
            {
                path: "/movies/:id",
                element: <Detailsmovie />,
                loader: ({ params }) => fetch(`http://localhost:5000/movies/${params.id}`),
            }
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "/auth/login", element: <Login /> },
            { path: "/auth/register", element: <Register /> },
            // { path: "/auth/forgot-password", element: <ForgotPassword /> },
        ],
    },
    {
        path: "/user",
        element: (
            <PrivateRoute>
                <HomeLayout />
            </PrivateRoute>
        ),
        children: [
            { path: "/user/addmovies", element: <Addmovies /> },
            { path: "/user/favmovies", element: <Favmovies /> },
        ]
    },
    {
        path: "*",
        element: (
            <Page404 />
        ),
    }
    // {
    //     path: "movies",
    //     element: (
    //         <HomeLayout />
    //     ),
    //     children: [
    //         {path: "/movies/all", element: <Allmovies />},
    //         {path: "/movies/faq", element: <Faq />}
    //     ]
    // }
]);

export default router;