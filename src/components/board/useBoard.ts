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
    isGameEnd,
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

  // If the user reloads the page, the matched cards need to be saved in the state
  useEffect(() => {
    if (!state.matchedCards.length) {
      dispatch({ type: "SET_STATE", payload: { matchedCards: visibleCards } });
    }
  }, [dispatch, state.matchedCards.length, visibleCards]);

  useEffect(() => {
    const matchesLength = state.matchedCards.length;
    const shouldSaveMatchedCards = matchesLength && matchesLength % 2 === 0;
    if (shouldSaveMatchedCards) {
      const uniqueMatches = [...new Set(state.matchedCards)];
      localStorage.setItem("cardId", JSON.stringify(uniqueMatches));
    }
  }, [state.matchedCards]);

  useEffect(() => {
    const shouldFinishGame = state.matchedCards.length === 16 && !isGameEnd;
    if (shouldFinishGame) {
      stopTimer();
      saveScore();
      saveIsGameFinished();
    }
  }, [
    isGameEnd,
    stopTimer,
    saveScore,
    saveIsGameFinished,
    state.matchedCards.length,
  ]);

  useEffect(() => {
    const shouldStopTimer = isOutsideGamePage || isGameEnd;
    if (shouldStopTimer) {
      dispatch({ type: "SET_STATE", payload: { isTimerPaused: true } });
    } else {
      dispatch({ type: "SET_STATE", payload: { isTimerPaused: false } });
    }
  }, [dispatch, isGameEnd, isOutsideGamePage]);

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
    isGameFinished: isGameEnd,
    resetGame,
    onStartNewGame,
    onLogOut,
  };
};

export default useBoard;
