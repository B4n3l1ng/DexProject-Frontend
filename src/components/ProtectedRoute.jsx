/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <>Loading...</>;
  } else {
    if (isLoggedIn) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default ProtectedRoute;
