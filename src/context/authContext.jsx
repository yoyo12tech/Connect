import {createContext,useState,useEffect} from 'react'
import { getLoggedUserDataApi } from "../services/authServices";



export const authContext = createContext(); 

export default function AuthContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token")!=null)
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null)
    const [profilePicture, setprofilePicture] = useState(null)
    useEffect(() => {
      async function getUserInfo(){
        const data = await getLoggedUserDataApi();
        if(data.message=="success"){
            setUserId(data.user._id)
            setUser(data.user);
            setprofilePicture(data.user.photo)
        }
      }
      getUserInfo()
    }, [])
    
    



    
    return (<authContext.Provider value={{isLoggedIn, setIsLoggedIn,userId,user,profilePicture,setprofilePicture}}>
        {children}
    </authContext.Provider>)
}