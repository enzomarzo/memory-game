import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import useDataStorage from "../hooks/useDataStorage";

const useCard = (actualCardUniqueId: number) => {
  const [isFlipped, setIsFlipped] = useState(true);
  const { state, dispatch } = useContext(Context);
  const { getCards } = useDataStorage();

  // set step 1: The user clicks on the first card
  const firstFlip = (cardUniqueId: number) => {
    if (actualCardUniqueId !== cardUniqueId) return;
    setIsFlipped(false);
    dispatch({
      type: "SET_STATE",
      payload: { step: 1, firstCardUniqueId: actualCardUniqueId },
    });
  };

  // set step 2: The first is visible, and then the user clicks on the second card
  const secondFlip = (cardUniqueId: number) => {
    if (actualCardUniqueId !== cardUniqueId) return;
    setIsFlipped(false);
    dispatch({
      type: "SET_STATE",
      payload: { step: 2, secondCardUniqueId: actualCardUniqueId },
    });
  };

  useEffect(() => {
    const cards = getCards();
    const showCards = cards.includes(actualCardUniqueId);
    if (showCards) {
      setIsFlipped(false);
    }
    if (state.step === 0 && !showCards) {
      setIsFlipped(true);
    }
  }, [actualCardUniqueId, getCards, state.step]);

  return {
    isFlipped,
    setIsFlipped,
    firstFlip,
    secondFlip,
  };
};

export default useCard;
