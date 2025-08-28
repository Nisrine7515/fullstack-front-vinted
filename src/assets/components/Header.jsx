import logo from "../images/logo.png";
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  return (
    <header>
      <div className="left-header">
        <img src={logo} alt="logo" />
        <div className="left-buttons">
          <input
            className="search"
            type="text"
            placeholder="Recherche des articles"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className="tri">
            <label htmlFor="tri">Trier par prix :</label>
            <button className="tri"></button>
          </div>
        </div>
      </div>
      <div className="buttons">
        <div>
          <button>S'inscrire</button>
        </div>
        <div>
          <button>Se connecter</button>
        </div>
        <div>
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
