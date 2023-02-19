import { Navigate } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth";

export default function AdminRoute({children}){
    
    const isLoggedIn = useAdminAuth();

    let auth = JSON.parse(localStorage.getItem('auth')) 
    const admin = auth?.user?.role === 'admin' &&  auth?.token
 
    

    return  admin || isLoggedIn   ? children : <Navigate to='/login'/>
}
