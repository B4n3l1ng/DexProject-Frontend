import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        { email, password, name }
      );
      if (response?.status === 201) {
        storeToken(response.data.authToken);
        await authenticateUser();
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        setErrorMessage(error.response.data.message);
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
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        isSignUp
      />
    </>
  );
};

export default Signup;
