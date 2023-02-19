import { useSelector } from "react-redux";

export default function useAdminAuth(){
    const auth = useSelector(state => state?.auth);

    console.log(auth);

    if(auth?.token && auth?.user?.role === "admin"){
        return true; 
    } else{
        return false;
    }
}