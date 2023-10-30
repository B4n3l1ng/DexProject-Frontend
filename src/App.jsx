import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import DexPage from "./pages/DexPage";
import PokemonDetails from "./pages/PokemonDetails";
function App() {
  return (
    <div className="root">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <h1>{"You're in"}</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/dex" element={<DexPage />} />
        <Route path="/dex/pokemon/:dexNumber" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
