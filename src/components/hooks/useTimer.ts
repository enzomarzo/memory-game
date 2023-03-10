import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import useDataStorage from "./useDataStorage";

export const useTimer = () => {
  const { savedTimer } = useDataStorage();
  const [time, setTime] = useState(savedTimer);
  const { state, dispatch } = useContext(Context);
  const { isTimerPaused } = state;

  const clearTimer = useCallback(() => {
    setTime(0);
    localStorage.removeItem("timer");
  }, []);

  const stopTimer = useCallback(() => {
    dispatch({ type: "SET_STATE", payload: { isTimerPaused: true } });
  }, []);

  useEffect(() => {
    if (!isTimerPaused) {
      const interval = setInterval(() => {
        setTime((time) => time + 1);
        localStorage.setItem("timer", time.toString());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimerPaused, time]);

  return {
    time,
    setTime,
    clearTimer,
    stopTimer,
  };
};
