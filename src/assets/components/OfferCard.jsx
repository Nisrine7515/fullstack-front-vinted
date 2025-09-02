import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
  return (
    <article>
      <div className="owner-details">
        {offer.owner.account.avatar && (
          <img
            src={offer.owner.account.avatar.secure_url}
            alt="profil owner"
            className="avatar"
          />
        )}

        <p>{offer.owner.account.username}</p>
      </div>
      <Link to={"/offer/" + offer._id}>
        <img
          className="product-image"
          src={offer.product_image.secure_url}
          alt="offer view"
        />
        <p>{offer.product_price + " €"}</p>

        {offer.product_details.map((element, index) => {
          // console.log(element);
          return (
            element["TAILLE"] && (
              <p key={element.TAILLE + index}>{element.TAILLE}</p>
            )
          );
        })}

        {offer.product_details.map((element, index) => {
          // console.log(element);
          return (
            element["MARQUE"] && (
              <p key={element.MARQUE + index}>{element.MARQUE}</p>
            )
          );
        })}
      </Link>
    </article>
  );
};

export default OfferCard;
