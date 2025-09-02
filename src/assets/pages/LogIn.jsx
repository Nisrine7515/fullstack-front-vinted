import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import handleChange from "../utils/handleChange";

const Login = ({ setIsConnected, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email, password }
      );
      Cookie.set("token", response.data.token);
      setIsConnected(response.data.token);
      onClose();
      navigate("/");
    } catch (error) {
      console.log(error.response || error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          X
        </button>
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => handleChange(event, setEmail)}
          />
          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => handleChange(event, setPassword)}
          />
          <button>Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
