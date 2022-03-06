import { useReducer } from "react";
import {
  UPDATE_EVENTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_EVENTS:
      return {
        ...state,
        events: [...action.events],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.event],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(event => {
        return event._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }

    default:
      return state;
  }
};

export function useEventReducer(initialState) {
  return useReducer(reducer, initialState)
}