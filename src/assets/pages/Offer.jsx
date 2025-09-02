import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = ({ isConnected }) => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
        );
        setData(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  const handleBuy = () => {
    if (!isConnected) {
      navigate("/login");
    } else {
      navigate("/payment", {
        state: {
          title: data.product_name,
          amount: Number(data.product_price),
        },
      });
    }
  };

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="offer-page">
      <div className="container">
        <img src={data.product_pictures[0].secure_url} alt="beau vêtement" />
        <section>
          <p>{data.product_price + " €"}</p>
          <p>{data.product_name}</p>
          <button onClick={handleBuy}>Acheter</button>
        </section>
      </div>
    </main>
  );
};

export default Offer;
