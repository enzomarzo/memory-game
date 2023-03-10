import { useCallback, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../context/Context";
import useDataStorage from "../hooks/useDataStorage";
import { useTimer } from "../hooks/useTimer";

const useBoard = () => {
  const {
    scores,
    username,
    visibleCards,
    clearCards,
    getIsGameFinished,
    saveIsGameFinished,
    removeIsGameFinished,
  } = useDataStorage();
  const { time, clearTimer, stopTimer } = useTimer();
  const { state, dispatch } = useContext(Context);
  let location = useLocation();
  const isOutsideGamePage = Boolean(location.state?.background);

  const resetGame = useCallback(() => {
    clearTimer();
    clearCards();
    dispatch({ type: "SET_STATE", payload: { matchedCards: [] } });
    removeIsGameFinished();
  }, [clearTimer, clearCards, dispatch, removeIsGameFinished]);

  const saveScore = useCallback(() => {
    const gamesFinished = [...scores, { username, time }];
    localStorage.setItem("gamesFinished", JSON.stringify(gamesFinished));
  }, [scores, time, username]);

  const onStartNewGame = () => {
    resetGame();
  };

  useEffect(() => {
    if (!state.matchedCards.length) {
      console.log("state initial");
      dispatch({ type: "SET_STATE", payload: { matchedCards: visibleCards } });
    }
  }, []);

  useEffect(() => {
    if (state.matchedCards.length && state.matchedCards.length % 2 === 0) {
      const uniqueMatches = [...new Set(state.matchedCards)];
      localStorage.setItem("cardId", JSON.stringify(uniqueMatches));
    }
  }, [state.matchedCards]);

  console.log(state.matchedCards);

  useEffect(() => {
    if (state.matchedCards.length === 16 && !getIsGameFinished) {
      stopTimer();
      saveScore();
      saveIsGameFinished();
    }
  }, [
    getIsGameFinished,
    visibleCards,
    stopTimer,
    saveScore,
    saveIsGameFinished,
  ]);

  useEffect(() => {
    if (isOutsideGamePage) {
      dispatch({ type: "SET_STATE", payload: { isTimerPaused: true } });
    }
  }, [dispatch, isOutsideGamePage]);

  useEffect(() => {
    const validateCards = () => {
      console.log("validade", state.firstCardId, state.secondCardId);
      if (state.firstCardId === state.secondCardId) {
        dispatch({ type: "SET_STATE", payload: { step: 0 } });
        dispatch({
          type: "ADD_MATCHED_CARD",
          firstMatchedCard: state.firstCardUniqueId,
          secondMatchedCard: state.secondCardUniqueId,
        });
      } else {
        setTimeout(() => {
          dispatch({ type: "SET_STATE", payload: { step: 0 } });
        }, 1000);
      }
    };
    if (state.step === 2) {
      validateCards();
    }
  }, [state.step, state.firstCardId, state.secondCardId]);

  return {
    username,
    visibleCards,
    time,
    isGameFinished: getIsGameFinished,
    resetGame,
    onStartNewGame,
  };
};

export default useBoard;