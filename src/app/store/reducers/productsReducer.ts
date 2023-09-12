import { IProductsState, IProductsAction, ProductActionsType } from '../types';

const InitialState: IProductsState = {
  products: [],
  categories: [],
  loading: false,
  msg: { body: '', error: false }
};

export const productsReducer = (state = InitialState, action: IProductsAction): IProductsState => {

  switch (action.type) {

  case ProductActionsType.PENDING_PRODS: 
    return {
      products: [...state.products],
      categories: [...state.categories],
      loading: true, 
      msg: { body: '', error: false }
    };

  case ProductActionsType.UPDATE_PRODS: 
    return {
      products: [...action.payload.prods], 
      categories: [...state.categories], 
      loading: false, 
      msg: { body: action.payload.msg || '', error: false }
    };

  case ProductActionsType.UPDATE_CATS: 
    return {
      products: [...state.products], 
      categories: [...action.payload], 
      loading: false, 
      msg: { body: state.msg.body, error: false }
    };

  case ProductActionsType.ERROR_PRODS: 
    return {
      products: [...state.products],
      categories: [...state.categories],
      loading: false, 
      msg: { body: action.payload, error: true }
    };

  default:
    return state;

  }

};