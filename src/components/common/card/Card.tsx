import { useEffect, useState } from "react";
import Button from "../../foundation/button/Button";
import classes from "./card.module.scss";

interface ICardProps {
  src: string;
  alt: string;
}

function Card({ src, alt }: ICardProps) {
  const [isFlipped, setIsFlipped] = useState(true);

  const onFlippCard = () => {
    if (isFlipped) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <Button
      onClick={onFlippCard}
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
