import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {

    const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [typedEmail, setTypedEmail] = useState("");

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return regex.test(password);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");
        
        if (!validatePassword(password)) {
            setPasswordError("Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
            return;
        }
        setPasswordError('');
        // e.target.reset();

        try {
            const userCredential = await userLogin(email, password);
            const user = userCredential.user;
            setUser(user);
            await e.target.reset();
            navigate(location?.state ? location.state : "/"); //dont know

        } catch (error) {
            setFormError(error.code);
            toast.error(error.code);
            // console.log(error);
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

    const handleNavigation = () =>{
        navigate("/auth/forgot-password", {state: {email: typedEmail}});
    }

    return (
        <div className='min-h-[calc(100vh-248px)] mt-5'>
            <div className="card bg-base-100 w-full max-w-4xl mx-auto shrink-0 shadow-2xl mb-10">
                <div><h2 className='text-center text-3xl pt-4'>Login</h2></div>
                <form className="card-body" onSubmit={loginUser}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" value={typedEmail} onChange={(e) => setTypedEmail(e.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                        <label className="label">
                            <div onClick={handleNavigation} className="label-text-alt link link-hover">Forgot password?</div>
                        </label>
                        {passwordError && <div className='text-red-600 mt-2'>{passwordError}</div>}
                    </div>
                    {formError && <div className='text-red-600 mt-2 font-semibold'>{formError}</div>}
                    <div className="form-control mt-5 w-full max-w-[400px]  mx-auto">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    
                </form>

                    <div className=' mb-10 w-full flex flex-col  max-w-[464px] mx-auto px-8' >
                        <button className='flex gap-2 items-center justify-center btn btn-neutral' onClick={()=>googleLogin()}>Sign in with Google <FcGoogle className='text-xl' /> </button>
                    </div>
                    <div className='divider'></div>
                    <Link to={"/auth/register"} state={location.state} className=' mb-10 w-full flex flex-col  max-w-[464px] mx-auto px-8 ' >
                        <button className='flex gap-2 items-center justify-center btn btn-neutral' >Register</button>
                    </Link>
            </div>
        </div>
    );
};

export default Login;