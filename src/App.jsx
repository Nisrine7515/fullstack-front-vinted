import { useState } from "react";
import Cookie from "js-cookie";

import Header from "./assets/components/Header";
import Home from "./assets/pages/Home";
import Offer from "./assets/pages/Offer";
import NoMatch from "./assets/pages/NoMatch";
import SignUp from "./assets/pages/SignUp";
import Login from "./assets/pages/Login";
import Publish from "./assets/pages/Publish";
import Payment from "./assets/pages/Payment";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(Cookie.get("token") || false);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100000);

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Header
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        title={title}
        setTitle={setTitle}
        priceMin={priceMin}
        priceMax={priceMax}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
        setShowSignUp={setShowSignUp}
        setShowLogin={setShowLogin}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={title}
              priceMin={priceMin}
              priceMax={priceMax}
              isConnected={isConnected}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={<Offer isConnected={isConnected} />}
        />
        <Route
          path="/publish"
          element={<Publish isConnected={isConnected} />}
        />
        <Route
          path="/payment"
          element={<Payment isConnected={isConnected} />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>

      {showSignUp && (
        <SignUp
          setIsConnected={setIsConnected}
          onClose={() => setShowSignUp(false)}
        />
      )}
      {showLogin && (
        <Login
          setIsConnected={setIsConnected}
          onClose={() => setShowLogin(false)}
        />
      )}
    </Router>
  );
}

export default App;
