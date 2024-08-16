// store.ts
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
//import thunk from "redux-thunk"; // Middleware for handling async actions
import reducers from "../reducers";

// Redux DevTools setup
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware())
);

export default store;


