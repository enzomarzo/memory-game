import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Button from "../../foundation/button/Button";
import classes from "./card.module.scss";

interface ICardProps {
  src: string;
  alt: string;
  photoId: number;
}

function Card({ src, alt, photoId }: ICardProps) {
  const [isFlipped, setIsFlipped] = useState(true);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const getCardIds = localStorage.getItem("cardId");
    const savedCardIds = getCardIds && JSON.parse(getCardIds);
    const permantedFlopped = savedCardIds?.includes(photoId);
    if (permantedFlopped) {
      setIsFlipped(false);
    }
    if (state.step === 0 && !permantedFlopped) {
      setIsFlipped(true);
    }
  }, [state]);

  const firstFlip = () => {
    setIsFlipped(false);
    dispatch({ type: "SET_STATE", payload: { step: 1, isMatch: false } });
  };

  const secondFlip = (id: number) => {
    setIsFlipped(false);
    dispatch({ type: "SET_STATE", payload: { step: 2 } });
    validateCards(id);
  };

  const validateCards = (id: number) => {
    if (state.selectedCard === id) {
      dispatch({ type: "SET_STATE", payload: { isMatch: true, step: 0 } });
      dispatch({ type: "SET_STATE", payload: state.matchedCards.push(id) });
      localStorage.setItem("cardId", JSON.stringify(state.matchedCards));
    } else {
      setTimeout(() => {
        dispatch({ type: "SET_STATE", payload: { step: 0 } });
      }, 1000);
    }
  };

  const onFlippCard = (id: number) => {
    dispatch({ type: "SET_STATE", payload: { selectedCard: id } });
    if (state.step === 0) firstFlip();
    if (state.step === 1) secondFlip(id);
  };

  return (
    <Button
      onClick={() => onFlippCard(photoId)}
      additionalCSS={`${classes.card} ${isFlipped ? classes.cardFlipped : ""}`}
    >
      <div className={isFlipped ? classes.cardFront : classes.cardBack}>
        <img
          className={classes.image}
          src={isFlipped ? "./backflipped.jpg" : src}
          alt={isFlipped ? "backflipped card" : alt}
        />
      </div>
    </Button>
  );
}

export default Card;
