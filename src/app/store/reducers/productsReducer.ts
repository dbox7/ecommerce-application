import { Category, ProductProjection } from '@commercetools/platform-sdk';

const InitialState: IProductsState = {
  products: [],
  categories: [],
  loading: false,
  msg: { body: '', error: false }
};

interface IProductPayload {
  prods: ProductProjection[],
  msg?: string
}

interface IProductsState {
  products: ProductProjection[],
  categories: Category[],
  loading: boolean
  msg: { body: string, error: boolean }
}

export enum ProductActionsType {
  PENDING_PRODS = 'PENDING_PRODS',
  UPDATE_PRODS = 'UPDATE_PRODS',
  UPDATE_CATS = 'UPDATE_CATS',
  ERROR_PRODS = 'ERROR_PRODS',
}

interface IPendingAction {
  type: ProductActionsType.PENDING_PRODS
}

interface IUpdateProdsAction {
  type: ProductActionsType.UPDATE_PRODS
  payload: IProductPayload
}

interface IUpdateCatsAction {
  type: ProductActionsType.UPDATE_CATS
  payload: Category[]
}

interface IErrorAction {
  type: ProductActionsType.ERROR_PRODS
  payload: string
}

export type IProductsAction = IPendingAction | IUpdateProdsAction | IUpdateCatsAction | IErrorAction ;

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