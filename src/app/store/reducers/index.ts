import { combineReducers } from 'redux';
import { productsReducer } from './productsReducer';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  cart: cartReducer
});

export type rootState = ReturnType<typeof rootReducer>;