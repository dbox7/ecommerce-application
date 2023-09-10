import { ProductProjection } from '@commercetools/platform-sdk';

interface IProductsState {
  products: ProductProjection[]
  loading: boolean
  error: string
}

interface IProductsAction {
  type: string
  payload?: ProductProjection | string
}

const InitialState: IProductsState = {
  products: [],
  loading: false,
  error: ''
};

export const productsReducer = (state = InitialState, action: IProductsAction): IProductsState => {

  switch (action) {

  default:
    return state;

  }

};