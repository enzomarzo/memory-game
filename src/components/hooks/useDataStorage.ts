import { useState } from "react";

const useDataStorage = () => {
  const username = localStorage.getItem("username") || "";

  const getCardIds = localStorage.getItem("cardId");
  const cardIds: number[] = (getCardIds && JSON.parse(getCardIds)) || [];
  const [visibleCards, setVisibleCards] = useState(cardIds);

  const savedTimer = Number(localStorage.getItem("timer")) || 0;

  const getScores = localStorage.getItem("gamesFinished");
  const scores = (getScores && JSON.parse(getScores)) || [];

  const getIsGameFinished = localStorage.getItem("isGameFinished");

  const saveIsGameFinished = () => {
    localStorage.setItem("isGameFinished", "true");
  };
  const removeIsGameFinished = () => {
    localStorage.removeItem("isGameFinished");
  };

  const clearCards = () => {
    setVisibleCards(() => []);
    localStorage.removeItem("cardId");
  };

  const logOut = () => localStorage.removeItem("username");

  const getCards = () => {
    const getCardIds = localStorage.getItem("cardId");
    const cardIds: number[] = (getCardIds && JSON.parse(getCardIds)) || [];
    return cardIds;
  };

  return {
    username,
    getIsGameFinished,
    visibleCards,
    savedTimer,
    scores,
    clearCards,
    getCards,
    saveIsGameFinished,
    removeIsGameFinished,
    logOut,
  };
};

export default useDataStorage;
