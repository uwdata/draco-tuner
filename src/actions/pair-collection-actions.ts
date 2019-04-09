import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { createAction } from "typesafe-actions";
import { RootState } from "../reducers";

export const reloadPairsThunk = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const pairs = getState().pairCollection.pairs;
    dispatch(reloadPairsBegin(pairs));
  };
};

export const reloadPairsBegin = createAction(
  "pair-collection/RELOAD_PAIRS_BEGIN",
  action => {
    return pairs => action(pairs);
  }
);
