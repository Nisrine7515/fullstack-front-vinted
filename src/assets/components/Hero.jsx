import { useNavigate } from "react-router-dom";

export default function Hero({ isConnected }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isConnected) {
      navigate("/publish");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="hero">
      <img
        className="hero-background"
        src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92"
        alt="hero background"
      />
      <div className="hero-overlay">
        <div className="hero-box">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button onClick={handleClick}>Commencer à vendre</button>
        </div>
      </div>
    </section>
  );
}
