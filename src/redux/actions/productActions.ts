// actions.ts
import { ActionTypes } from "../constants/action-types";
import { Product } from "./Types"; 

export const setProducts = (products: Product[]) => ({
  type: ActionTypes.SET_PRODUCTS,
  payload: products,
});

export const selectedProduct = (product: Product) => ({
  type: ActionTypes.SELECTED_PRODUCT,
  payload: product,
});

export const setProductData = (products: Product[]) => ({
  type: ActionTypes.SET_PRODUCT_DATA,
  payload: products,
});

export const setSearchResults = (results: Product[]) => ({
  type: ActionTypes.SET_SEARCH_RESULTS,
  payload: results,
});

export const setCartItems = (items: { [key: number]: number }) => ({
  type: ActionTypes.SET_CART_ITEMS,
  payload: items,
});

export const setCartUpdated = (updated: boolean) => ({
  type: ActionTypes.SET_CART_UPDATED,
  payload: updated,
});

export const addToCart = (productId: number, quantity: number) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: { productId, quantity },
});

export const removeFromCart = (productId: number) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: productId,
});

export const addItem = (productId: number) => ({
  type: ActionTypes.ADD_ITEM,
  payload: productId,
});



export const deleteFromCart = (productId: number) => {
  return {
    type: ActionTypes.DELETE_FROM_CART,
    payload: productId,
  };
};

