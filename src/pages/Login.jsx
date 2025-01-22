import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
    const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            const userCredential = await userLogin(email, password);
            const user = userCredential.user;
            setUser(user);
            navigate(location?.state ? location.state : "/");
        } catch (error) {
            setError("form", { message: error.code });
            toast.error(error.code);
        }
    };

    const googleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            setUser(user);
            navigate(location?.state ? location.state : "/");
        } catch (error) {
            toast.error(error.code);
        }
    };

    const handleNavigation = () => {
        navigate("/auth/forgot-password");
    };

    return (
        <div className='min-h-[calc(100vh-248px)] mt-5'>
            <div className="card bg-base-100 w-full max-w-4xl mx-auto shrink-0 shadow-2xl mb-10">
                <div><h2 className='text-center text-3xl pt-4'>Login</h2></div>
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <div className='text-red-600 mt-2'>{errors.email.message}</div>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                    message: "Password must have at least one uppercase, one lowercase, and 6+ characters",
                                },
                            })}
                        />
                        <label className="label">
                            <div onClick={handleNavigation} className="label-text-alt link link-hover">Forgot password?</div>
                        </label>
                        {errors.password && <div className='text-red-600 mt-2'>{errors.password.message}</div>}
                    </div>
                    {errors.form && <div className='text-red-600 mt-2 font-semibold'>{errors.form.message}</div>}
                    <div className="form-control mt-5 w-full max-w-[400px] mx-auto">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>

                <div className='mb-10 w-full flex flex-col max-w-[464px] mx-auto px-8'>
                    <button
                        className='flex gap-2 items-center justify-center btn btn-neutral'
                        onClick={googleLogin}
                    >
                        Sign in with Google <FcGoogle className='text-xl' />
                    </button>
                </div>
                <div className='divider'></div>
                <Link to={"/auth/register"} state={location.state} className='mb-10 w-full flex flex-col max-w-[464px] mx-auto px-8'>
                    <button className='flex gap-2 items-center justify-center btn btn-neutral'>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
