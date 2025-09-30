import { createContext, useState, useEffect } from "react";
import { getLoggedUserDataApi } from "../services/authServices";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    let pollInterval;

    const checkLoginAndFetch = async () => {
      const token = localStorage.getItem("token");

      if (token && !isLoggedIn) {
        setIsLoggedIn(true);
      }

      if (token) {
        try {
          const data = await getLoggedUserDataApi();
          if (data.message === "success") {
            setUserId(data.user._id);
            setUser(data.user);
            setProfilePicture(data.user.photo);
            clearInterval(pollInterval);
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      }
    };

    checkLoginAndFetch();

    pollInterval = setInterval(checkLoginAndFetch, 2000);

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        user,
        profilePicture,
        setProfilePicture,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
