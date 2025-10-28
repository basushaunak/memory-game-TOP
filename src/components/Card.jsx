// card-image-path, isOpen=false, isCleared=false
import cardCleared from "../assets/images/card-deck/card-cleared.png";
import cardClosed from "../assets/images/card-deck/card-closed.png";
import "../styles/Card.css";
export default function Card({ card, handleClick }) {
  let image;
  let className = "card";
  if (card.isCleared) {
    image = cardCleared;
  } else if (card.isOpen) {
    image = card.imageSource;
  } else {
    image = cardClosed;
    className += " glow";
  }
  return (
    <div className={className} onClick={handleClick}>
      <img className="card-image" src={image} />
    </div>
  );
}
