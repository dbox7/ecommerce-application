import { Cart } from '@commercetools/platform-sdk';

interface ICartState {
  cart: Cart | null,
  msg: { body: string, error: boolean }
}

interface ICartPayload {
  cart: Cart,
  msg?: string
}

export enum CartActionTypes {
  UPDATE_CART = 'UPDATE_CART',
  ERROR_CART = 'ERROR_CART'
}

interface ICartUpdate {
  type: CartActionTypes.UPDATE_CART,
  payload: ICartPayload
}

interface ICartError {
  type: CartActionTypes.ERROR_CART,
  payload: string
}

type ICartAction = ICartUpdate | ICartError;


const initialCart: ICartState = {
  cart: null,
  msg: { body: '', error: false }
};

export const cartReducer = (state: ICartState = initialCart, action: ICartAction): ICartState => {

  switch (action.type) {

  case CartActionTypes.UPDATE_CART:
    return {
      cart: action.payload.cart,
      msg: { body: action.payload.msg || '', error: false }
    };
  
  case CartActionTypes.ERROR_CART: 
    return {
      cart: state.cart,
      msg: { body: action.payload, error: true }
    };

  default:
    return state;

  }

};