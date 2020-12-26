import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
//import logger from "redux-logger";
//import { composeWithDevTools } from "redux-devtools-extension";
import { multiClientMiddleware } from "redux-axios-middleware";
import thunkMiddleware from "redux-thunk";
import clients from "./clients";
import middlewareConfig from "./middlewareConfig";

const saveState = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (err) {}
};

const loadState = () => {
  try {
    let state = localStorage.getItem("state");
    if (state === null) return undefined;
    return JSON.parse(state);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,

  applyMiddleware(
    thunkMiddleware,
    multiClientMiddleware(clients, middlewareConfig)
  )
);

store.subscribe(() => saveState({ userProfile: store.getState().userProfile }));

export default store;
