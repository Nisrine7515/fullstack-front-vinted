import { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import handleChange from "../utils/handleChange";

const SignUp = ({ setIsConnected, onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username,
          email,
          password,
          newsletter,
        }
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
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(event) => handleChange(event, setUsername)}
          />
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
          <label>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(event) => setNewsletter(event.target.checked)}
            />
            Recevoir la newsletter
          </label>
          <button>S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
