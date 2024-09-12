import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth =()=>{
    const {auth} = useAuth();
    const location = useLocation();

    return(auth?.user ? <Outlet/> : 
    //si el usuario no inicio secion se lo lleva al login
    <Navigate to="/login" state={{from: location}} replace/>);
}

export default RequireAuth;