import { useState } from "react";

const useDataStorage = () => {
  const getData = (data: string) => localStorage.getItem(data);

  const getDataAsArray = (data: string): string | number[] => {
    const string = getData(data);
    const array = (string && JSON.parse(string)) || [];
    return array;
  };

  const username = getData("username") || "";
  const savedTimer = Number(getData("timer")) || 0;
  const cardIds = getDataAsArray("cardId");
  const scores = getDataAsArray("gamesFinished");
  const isGameEnd = getData("isGameFinished");

  const [visibleCards, setVisibleCards] = useState(cardIds);

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
    const cards = getDataAsArray("cardId");
    return cards;
  };

  return {
    username,
    isGameEnd,
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
