import { ProductProjection, Category } from '@commercetools/platform-sdk';

// ------------------------------------------------------------------------------- For userReducer

export enum UserActionsType {
  PENDING = 'PENDING',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
  ERROR = 'ERROR'
}

export interface IPendingAction {
  type: UserActionsType.PENDING
}
export interface IUpdateSuccesAction {
  type: UserActionsType.UPDATE_SUCCESS
  payload: any
}

export interface IErrorAction {
  type: UserActionsType.ERROR
  payload: string
}

export type IUserAction = IPendingAction | IUpdateSuccesAction | IErrorAction ;

// ------------------------------------------------------------------------------- For productsReducer

export interface IProductPayload {
  prods: ProductProjection[],
  msg?: string
}

export interface IProductsState {
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

export interface IProdsPendingAction {
  type: ProductActionsType.PENDING_PRODS
}

export interface IUpdateProdsAction {
  type: ProductActionsType.UPDATE_PRODS
  payload: IProductPayload
}

export interface IUpdateCatsAction {
  type: ProductActionsType.UPDATE_CATS
  payload: Category[]
}

export interface IProdsErrorAction {
  type: ProductActionsType.ERROR_PRODS
  payload: string
}

export type IProductsAction = IProdsPendingAction | IUpdateProdsAction | IUpdateCatsAction | IProdsErrorAction ;