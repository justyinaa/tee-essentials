import { combineReducers } from "redux";
import { productReducer, selectedProductReducer } from "./productReducer";

const reducers = combineReducers({
  products: productReducer,
  selectedProduct: selectedProductReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
