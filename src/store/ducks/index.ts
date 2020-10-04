import { combineReducers } from "redux";
import { reducer as documentoLote } from "./documentoLote";

const reducers = combineReducers({
  documentoLote,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
