import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useNavigate } from 'react-router';
import { PiTreeEvergreenFill } from "react-icons/pi";
import { PiPopcornFill } from "react-icons/pi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const links = [
    <li key="home"><Link to="/">Home</Link></li>,
    user && <li key="profile"><Link to="/profile">Profile</Link></li>,
    user && <li key="update-profile"><Link to="/profile/update">Update Profile</Link></li>,
  ];

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      {/* Navbar Start: Logo and Hamburger */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link
          to="/"

        >
          <div className="btn btn-ghost text-2xl  italic flex items-center pl-0 md:pl-4 gap-2 flex-col">
            <PiPopcornFill className="text-yellow-400" />
            <span className="text-center hidden sm:block font-bold">Movie Mania</span>
          </div>
        </Link>
      </div>

      {/* Navbar Center: Links for larger screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          {links}
        </ul>
      </div>

      {/* Navbar End: User Profile and Buttons */}
      <div className="navbar-end ">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <button className='btn-disabled'>
                {user.displayName}
                </button>
                </li>
              <li><button onClick={() => logOut()}>
                Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className='flex'>
            <button
              className="btn btn-primary py-3 px-6 rounded-3xl min-h-0 h-auto mr-2"
              onClick={() => navigate("/auth/login")}>
              Login
            </button>
            <button
              className="btn btn-primary py-3 px-6 rounded-3xl min-h-0 h-auto mr-2"
              onClick={() => navigate("/auth/register")}>
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
