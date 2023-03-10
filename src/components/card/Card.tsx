import { useContext } from "react";
import classes from "./card.module.scss";
import Button from "../foundation/button/Button";
import { Context } from "../context/Context";
import useCard from "./useCard";

interface ICardProps {
  src: string;
  alt: string;
  photoId: number;
  cardUniqueId: number;
}

function Card({ src, alt, photoId, cardUniqueId }: ICardProps) {
  const { state, dispatch } = useContext(Context);
  const { isFlipped, firstFlip, secondFlip } = useCard(cardUniqueId);

  const onFlipCard = (id: ICardProps["photoId"]) => {
    if (!isFlipped) return;

    if (state.step === 0) {
      dispatch({
        type: "SET_STATE",
        payload: { firstCardId: id }
      });
      firstFlip(cardUniqueId);
    }

    if (state.step === 1) {
      dispatch({
        type: "SET_STATE",
        payload: { secondCardId: id }
      });
      secondFlip(cardUniqueId);
    }
  };

  return (
    <Button
      onClick={() => onFlipCard(photoId)}
      additionalCSS={`${classes.card} ${isFlipped ? classes.cardFlipped : ""}`}
    >
      <div className={isFlipped ? classes.cardFront : classes.cardBack}>
        <img
          className={classes.image}
          src={isFlipped ? "/backflipped.jpg" : src}
          alt={isFlipped ? "backflipped card" : alt}
        />
      </div>
    </Button>
  );
}

export default Card;
