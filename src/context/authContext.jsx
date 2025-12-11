import { createContext, useState, useEffect } from "react";
import { getLoggedUserDataApi } from "../services/authServices";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const initialToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [authReady, setAuthReady] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("mode"))
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setUserId('');
      setProfilePicture(null);
      setAuthReady(true);
      return;
    }
    try {
      const data = await getLoggedUserDataApi();
      if (data.message === "success") {
        setIsLoggedIn(true);
        setUserId(data.user._id);
        setUser(data.user);
        setProfilePicture(data.user.photo);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setIsLoggedIn(false);
    } finally {
      setAuthReady(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        authReady,
        setIsLoggedIn,
        userId,
        user,
        profilePicture,
        setProfilePicture,
        refreshUser: fetchUser,
        theme,
        setTheme
      }}
    >
      {children}
    </authContext.Provider>
  );
}
