import { useCallback, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import useDataStorage from "../hooks/useDataStorage";
import useTimer from "../hooks/useTimer";

const useBoard = () => {
  const {
    scores,
    username,
    visibleCards,
    clearCards,
    getIsGameFinished,
    saveIsGameFinished,
    removeIsGameFinished,
    logOut,
  } = useDataStorage();
  const { time, clearTimer, stopTimer } = useTimer();
  const { state, dispatch } = useContext(Context);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isOutsideGamePage = !pathname.endsWith("game");

  const resetGame = useCallback(() => {
    clearTimer();
    clearCards();
    dispatch({ type: "SET_STATE", payload: { matchedCards: [] } });
    removeIsGameFinished();
  }, [clearTimer, clearCards, dispatch, removeIsGameFinished]);

  const onLogOut = () => {
    resetGame();
    logOut();
    navigate("/");
  };

  const saveScore = useCallback(() => {
    const gamesFinished = [...scores, { username, time }];
    localStorage.setItem("gamesFinished", JSON.stringify(gamesFinished));
  }, [scores, time, username]);

  const onStartNewGame = () => {
    resetGame();
  };

  useEffect(() => {
    if (!state.matchedCards.length) {
      dispatch({ type: "SET_STATE", payload: { matchedCards: visibleCards } });
    }
  }, [dispatch, state.matchedCards.length, visibleCards]);

  useEffect(() => {
    if (state.matchedCards.length && state.matchedCards.length % 2 === 0) {
      const uniqueMatches = [...new Set(state.matchedCards)];
      localStorage.setItem("cardId", JSON.stringify(uniqueMatches));
    }
  }, [state.matchedCards]);

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
    state.matchedCards.length,
  ]);

  useEffect(() => {
    if (isOutsideGamePage || getIsGameFinished) {
      dispatch({ type: "SET_STATE", payload: { isTimerPaused: true } });
    } else {
      dispatch({ type: "SET_STATE", payload: { isTimerPaused: false } });
    }
  }, [dispatch, getIsGameFinished, isOutsideGamePage]);

  useEffect(() => {
    const validateCards = () => {
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
  }, [state, dispatch]);

  return {
    username,
    visibleCards,
    time,
    isGameFinished: getIsGameFinished,
    resetGame,
    onStartNewGame,
    onLogOut,
  };
};

export default useBoard;
