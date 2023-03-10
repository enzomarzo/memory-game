import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import useDataStorage from "./useDataStorage";

const useTimer = () => {
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
  }, [dispatch]);

  useEffect(() => {
    if (!isTimerPaused) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
        localStorage.setItem("timer", time.toString());
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [isTimerPaused, time]);

  return {
    time,
    setTime,
    clearTimer,
    stopTimer,
  };
};

export default useTimer;
