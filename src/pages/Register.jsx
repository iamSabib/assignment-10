import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";


const Register = () => {

    const { userRegister, setProfile, displayName, setUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('')
    // console.log(authInfo)
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return regex.test(password);
    };

    const registerUser = async (e) => {
        e.preventDefault();
        const userEmail = e.target.email.value;
        const userPass = e.target.password.value;
        const userName = e.target.name.value;
        const userPhotoUrl = e.target.photoUrl.value;
        
        if(!validatePassword(userPass)){
            setPasswordError("Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
            return
        }
        setPasswordError('');
        // e.target.reset();
        // console.log(userEmail, userPass);

        try {
            // Create a new user
            const userCredential = await userRegister(userEmail, userPass);
            const user = userCredential.user;

            // Update the state to the current user
            setUser(user);
            toast.success("Successfully Registered")
            // console.log(user, "Successfully Registered");

            // Update user profile
            await setProfile(userName, userPhotoUrl);
            // console.log("Success Profile", userName, userPhotoUrl);
            setFormError('');
            e.target.reset();
            navigate("/")

        } catch (e) {
            setFormError(e.code);
            toast.error(e.code);
            // console.log("ERROR", e.code, "<--->", e.message);
        }



    }

    const googleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            await setUser(user);
            // console.log("Here",location.state)
            navigate(location?.state ? location.state : "/");
        } catch (error) {
            toast.error(error.code);
        }
        

    }

    return (
        <div className='min-h-[calc(100vh-264px)] mt-5'>
            <div className="card bg-base-100 w-full max-w-4xl mx-auto shrink-0 shadow-2xl">
                <div><h2 className='text-center text-3xl pt-4'>Registration</h2></div>
                <form onSubmit={registerUser} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        {passwordError && <div className='text-red-600 mt-2'>{passwordError}</div>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name="photoUrl" placeholder="photoUrl" className="input input-bordered" required />
                    </div>
                    {formError && <div className='text-red-600 mt-2 font-semibold'>{formError}</div>}
                    <div className="form-control mt-6 w-40 lg:w-60 mx-auto">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                <div className='divider'></div>
                <Link to={"/auth/login"} className="form-control w-40 lg:w-60 mx-auto mb-10">
                        <p className='text-center my-2 opacity-90'>Already have an account</p>
                        <button className="btn btn-neutral">Login</button>
                    </Link>

                <div className="form-control w-40 lg:w-60 mx-auto mb-10">
                        <button className="btn btn-neutral" onClick={()=>googleLogin()}>Sign in with Google
                        <FcGoogle className='text-xl' />
                        </button>
                    </div>
                
            </div>
        </div>
    );
};

export default Register;