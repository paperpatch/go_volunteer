import { useReducer } from "react";
import {
  UPDATE_EVENTS,
  ADD_TO_SIDEBAR,
  REMOVE_FROM_SIDEBAR,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  TOGGLE_SIDEBAR
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_EVENTS:
      return {
        ...state,
        events: [...action.products],
      };

    case ADD_TO_SIDEBAR:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case REMOVE_FROM_SIDEBAR:
      let newState = state.cart.filter(event => {
        return event._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case TOGGLE_SIDEBAR:
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