import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ isConnected }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, amount } = state || {};

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) navigate("/login");
    if (!title || !amount) navigate("/");
  }, [isConnected, title, amount, navigate]);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const { data } = await axios.post("http://localhost:3000/payment", {
          title,
          amount,
        });
        setClientSecret(data.clientSecret);
      } catch (e) {
        console.log(e?.response || e);
      } finally {
        setLoading(false);
      }
    };
    if (isConnected && title && amount) createIntent();
  }, [isConnected, title, amount]);

  if (loading) return <p>Préparation du paiement…</p>;
  if (!clientSecret) return <p>Impossible de préparer le paiement.</p>;

  return (
    <main>
      <h1>Paiement pour : {title}</h1>
      <p>Montant : {amount} €</p>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </main>
  );
};

export default Payment;
