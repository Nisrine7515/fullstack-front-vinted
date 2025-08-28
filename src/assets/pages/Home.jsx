import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  useEffect(function () {
    async function fetchData() {
      const response = await axios(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );

      setIsLoading(false);
    }
    fetchData();
  });

  if (isLoading === true) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      {offers.map(function (offer) {
        return (
          <div key={offer._id}>
            <Link to={"/offer/" + offer._id}>
              <img
                src={offer.product_pictures}
                alt={"image de " + offer.product_name}
              />
              <h3>{offer.product_name}</h3>
              <p>{offer.product_price} €</p>
              <p>Vendeur : {offer.owner.account.username}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
