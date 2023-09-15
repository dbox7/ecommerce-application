import { Cart } from '@commercetools/platform-sdk';
import { emptyCart } from '../../utils/constants';

interface ICartState {
  cart: Cart
}

// interface ICartPayload {
//   cart: Cart
// }

export enum CartActionTypes {
  UPDATE_CART = 'UPDATE_CART',
  ERROR_CART = 'ERROR_CART'
}

interface ICartUpdate {
  type: CartActionTypes.UPDATE_CART,
  payload: Cart
}

interface ICartError {
  type: CartActionTypes.ERROR_CART,
  payload: string
}

type ICartAction = ICartUpdate | ICartError;


const initialCart: ICartState = {
  cart: localStorage.cart ? JSON.parse(localStorage.cart): emptyCart
};

export const cartReducer = (state: ICartState = initialCart, action: ICartAction): ICartState => {

  switch (action.type) {

  case CartActionTypes.UPDATE_CART:
    return {
      cart: action.payload
    };
  
  case CartActionTypes.ERROR_CART: 
    return {
      cart: state.cart
    };

  default:
    return state;

  }

};