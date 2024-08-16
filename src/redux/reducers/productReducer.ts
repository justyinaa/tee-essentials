import { ActionTypes } from "../constants/action-types";
import { Product } from "../actions/Types";

const initialState = {
  productData: null as Product[] | null,
  searchResults: null as Product[] | null,
  cartItems: {} as { [key: number]: number },
  cartUpdated: false,
  products: [] as Product[],
  selectedProduct: {} as Product | null,
  
};

type Action = {
  type: string;
  payload?: any;
};

export const productReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: payload || [],
      };
    case ActionTypes.SET_PRODUCT_DATA:
      return { ...state, productData: payload };
    case ActionTypes.SET_SEARCH_RESULTS:
      return { ...state, searchResults: payload };
    case ActionTypes.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case ActionTypes.SET_CART_UPDATED:
      return { ...state, cartUpdated: payload };
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [payload.productId]: (state.cartItems[payload.productId] || 0) + payload.quantity,
        },
        cartUpdated: true,
      };
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [payload]: Math.max((state.cartItems[payload] || 0) - 1, 0),
        },
      };
    case ActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: {
          [payload]: Math.max((state.cartItems[payload] || 0) + 1, 0),
        },
      };
    case ActionTypes.DELETE_FROM_CART:
      const { [payload]: _, ...updatedCart } = state.cartItems;
      return { ...state, cartItems: updatedCart };
    case ActionTypes.SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
      };
    default:
      return state;
  }
};

export const selectedProductReducer = (state = {}, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    default:
      return state;
  }
};
