export interface IState {
  selectedCard: number;
  matchedCards: number[];
  isMatch: boolean;
  step: number;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IProvideProps {
  children: React.ReactNode;
}

export const initialState: IState = {
  selectedCard: 0,
  isMatch: false,
  matchedCards: [],
  step: 0,
};
