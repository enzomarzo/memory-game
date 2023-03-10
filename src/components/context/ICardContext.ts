export interface IState {
  isTimerPaused: boolean;
  matchedCards: number[];
  step: number;
  firstCardId: number;
  firstCardUniqueId: number;
  secondCardId: number;
  secondCardUniqueId: number;
}

export type IAction =
  | {
      type: "SET_STATE";
      payload: Partial<IState>;
    }
  | {
      type: "ADD_MATCHED_CARD";
      firstMatchedCard: number;
      secondMatchedCard: number;
    };

export interface IProvideProps {
  children: React.ReactNode;
}

export const initialState: IState = {
  isTimerPaused: false,
  matchedCards: [],
  step: 0,
  firstCardId: 0,
  firstCardUniqueId: 0,
  secondCardId: 0,
  secondCardUniqueId: 0,
};
