import { combineReducers } from "redux";

import modalReducers from "./modalReducers";
import validationsReducers from "./validationsReducers";
import tweetReducers from "./tweetReducers";
export default combineReducers({
  modals: modalReducers,
  validations: validationsReducers,
  tweets: tweetReducers,
});
