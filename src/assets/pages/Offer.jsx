import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Offer() {
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState(null);

  useEffect(function () {
    async function fetchData() {
      const response = await axios(
        "https://lereacteur-vinted-api.herokuapp.com/offer/"
      );

      setIsLoading(false);
    }
    fetchData();
  });

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>{offer.product_name}</h2>
      <img src={offer.product_image} alt={"offre " + offer.product_name} />
      <p>Prix : {offer.product_price} €</p>
      <p>Description : {offer.product_description}</p>
      <p>Vendeur : {offer.owner.account.username}</p>
    </div>
  );
}

export default Offer;
