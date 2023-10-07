/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => localStorage.setItem("authToken", token);

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/verify`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const user = response.data;
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      } catch (error) {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        setUser,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
