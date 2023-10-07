import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const NavBar = () => {
  const { isLoggedIn, isLoading, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        {!isLoading && isLoggedIn && (
          <>
            <li>
              <Link to="/profile">Profile Page</Link>
            </li>
            <li>
              <button onClick={logOutUser}>Logout</button>
            </li>
          </>
        )}
        {!isLoading && !isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/dex">DexPage</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
