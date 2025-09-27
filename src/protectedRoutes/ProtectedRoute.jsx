import { useContext } from "react"; 
import { authContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const {isLoggedIn}= useContext(authContext);
    
    return (
        isLoggedIn? children : <Navigate to={"/login"}/>
    )
}