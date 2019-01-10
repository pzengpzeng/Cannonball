import { combineReducers } from "redux";
import scores from "./scores_reducer";

const RootReducer = combineReducers({
  scores
});

export default RootReducer;
