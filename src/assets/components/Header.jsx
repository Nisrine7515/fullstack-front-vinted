import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Cookie from "js-cookie";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function Header({
  isConnected,
  setIsConnected,
  title,
  setTitle,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
  setShowSignUp,
  setShowLogin,
}) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState([priceMin, priceMax]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPriceMin(newValue[0]);
    setPriceMax(newValue[1]);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo header" />
        </Link>

        <input
          type="search"
          placeholder="Recherche des articles"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <div className="filters">
          <label>Prix entre :</label>
          <span>{value[0]}€</span>
          <span>{value[1]}€</span>
          <Box sx={{ width: 200 }}>
            <Slider
              getAriaLabel={() => "Plage de prix"}
              value={value}
              onChange={handleChange}
              min={0}
              max={500}
            />
          </Box>
        </div>

        <div className="actions">
          {isConnected ? (
            <button
              onClick={() => {
                setIsConnected(false);
                Cookie.remove("token");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <button onClick={() => setShowSignUp(true)}>S'inscrire</button>
              <button onClick={() => setShowLogin(true)}>Se connecter</button>
            </>
          )}
          <button
            className="sell-btn"
            onClick={() => {
              if (isConnected) {
                navigate("/publish");
              } else {
                setShowLogin(true);
              }
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
}
