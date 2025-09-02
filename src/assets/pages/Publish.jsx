import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

const Publish = ({ isConnected }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/login");
    }
  }, [isConnected, navigate]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Neuf");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Annonce publiée :", response.data);
      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.response || error.message);
    }
  };

  return (
    <main className="publish-page">
      <div className="container">
        <h1>Vends ton article</h1>
        <form onSubmit={handleSubmit} className="publish-form">
          <input
            type="text"
            placeholder="Titre de l'annonce"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="Neuf">Neuf</option>
            <option value="Très bon état">Très bon état</option>
            <option value="Bon état">Bon état</option>
            <option value="Correct">Correct</option>
          </select>
          <input
            type="text"
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Marque"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="number"
            placeholder="Taille"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="text"
            placeholder="Couleur"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <label className="custom-file-upload">
            {picture ? picture.name : "Choisir une image"}
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files[0])}
              required
            />
          </label>
          <button type="submit">Publier l'annonce</button>
        </form>
      </div>
    </main>
  );
};

export default Publish;
