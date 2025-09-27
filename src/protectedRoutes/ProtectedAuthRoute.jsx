import { useContext } from "react"; 
import { authContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedAuthRoute({children}){
    const {isLoggedIn}= useContext(authContext);
    
    return (
        isLoggedIn? <Navigate to={"/"}/> : children
    )
}