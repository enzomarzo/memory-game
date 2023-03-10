import React, { createContext, useReducer } from "react";
import { IState, IAction, IProvideProps, initialState } from "./ICardContext";

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "ADD_MATCHED_CARD":
      return {
        ...state,
        matchedCards: [
          ...state.matchedCards,
          action.firstMatchedCard,
          action.secondMatchedCard
        ]
      };
    default:
      return state;
  }
};

export const Context = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const Provider: React.FC<IProvideProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
