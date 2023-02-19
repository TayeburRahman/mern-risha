import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({children}){
    const isLoggedIn = useAuth();

    console.log('isLoggedIn',isLoggedIn )

    const local = localStorage.getItem('auth')  
    

    return  local || isLoggedIn   ? children : <Navigate to='/login'/>
}