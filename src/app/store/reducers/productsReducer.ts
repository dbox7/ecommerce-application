import { IProductsState, IProductsAction, ProductActionsType } from '../types';

const InitialState: IProductsState = {
  products: [],
  categories: [],
  loading: false,
};

export const productsReducer = (state = InitialState, action: IProductsAction): IProductsState => {

  switch (action.type) {

  case ProductActionsType.PENDING_PRODS: 
    return {
      products: [...state.products],
      categories: [...state.categories],
      loading: !state.loading
    };

  case ProductActionsType.UPDATE_PRODS: 
    return {
      products: [...action.payload], 
      categories: [...state.categories], 
      loading: true
    };

  case ProductActionsType.UPDATE_CATS: 
    return {
      products: [...state.products], 
      categories: [...action.payload], 
      loading: false
    };

  case ProductActionsType.ERROR_PRODS: 
    return {
      products: [...state.products],
      categories: [...state.categories],
      loading: false
    };

  default:
    return state;

  }

};