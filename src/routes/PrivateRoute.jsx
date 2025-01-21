import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {

    
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    // console.log("hererere",user)

    if (user && user?.email) {
        return children;
      }

    // return <Navigate to="/auth/login"></Navigate>
    return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;

};

export default PrivateRoute;