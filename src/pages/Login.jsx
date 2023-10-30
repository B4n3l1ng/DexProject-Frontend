import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import AuthForm from "../components/AuthForm";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { email, password }
      );
      if (response?.status === 200) {
        storeToken(response.data.authToken);
        await authenticateUser();
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error contacting the server, please try again.");
      }
    }
  };

  return (
    <>
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
