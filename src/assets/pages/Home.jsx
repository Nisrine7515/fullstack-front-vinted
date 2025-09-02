import axios from "axios";
import { useState, useEffect } from "react";
import OfferCard from "../components/OfferCard";
import Hero from "../components/Hero";

const Home = ({ title, priceMin, priceMax, isConnected }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += `?title=${title}`;
        }
        if (priceMin) {
          filters += filters
            ? `&priceMin=${priceMin}`
            : `?priceMin=${priceMin}`;
        }
        if (priceMax) {
          filters += filters
            ? `&priceMax=${priceMax}`
            : `?priceMax=${priceMax}`;
        }

        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers${filters}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [title, priceMin, priceMax]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="home">
      <Hero isConnected={isConnected} />
      <div className="container">
        {data.offers.map((offer) => (
          <OfferCard offer={offer} key={offer._id} />
        ))}
      </div>
    </main>
  );
};

export default Home;
