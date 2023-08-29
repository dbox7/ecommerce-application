import { Dispatch, SetStateAction } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { Customer } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from 
  '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export interface IAddress {
  streetName: string,
  city: string,
  postalCode: string,
  country: string
}

export interface IButtonProps {
  value: string,
  type: 'button' | 'submit' | 'reset',
  clickHandler?: React.MouseEventHandler,
  disabled?: boolean,
  extraClass?: string
}

export interface ICategoriesListProps { 
  categories: Category[]
  filters: IProductFilters,
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}
export interface ICheckboxProps {
  title: string
  checked: boolean,
  changeHandler: React.ChangeEventHandler
}

export interface ICountry {
  name: string,
  code: string,
  postalCode: RegExp
}

export interface IFiltersProps { 
  filters: IProductFilters, 
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}

export interface IGlobalStoreType {
  currentUser: Customer,
  apiMeRoot?: ByProjectKeyRequestBuilder,
}

export interface IProductFilters {
  search?: string,
  minPrice?: number,
  maxPrice?: number,
  categoryId?: string,
  sort: 'name' | 'price',
  sortOrder: boolean  // true = asc, false = desc
}

export interface IProductListProps {
  filters: IProductFilters
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}

export interface IInputProps {
  value: string;
  changeHandler: React.ChangeEventHandler;
  blurHandler: React.FocusEventHandler;
  activeState: boolean;
  valid: Partial<IValidation>;
}

export interface ISortProductsProps {
  type: 'name' | 'price'
  filters: IProductFilters,
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}

export interface ISearchBarProps {
  onSearch: (query: string) => void;
}

export interface IPayload {
  email: string,
  password: string, 
  firstName: string, 
  lastName: string, 
  dateOfBirth: string,
  addresses: IAddress[],
  shippingAddress: number[],
  defaultShippingAddress: number | undefined,
  billingAddress: number[],
  defaultBillingAddress: number | undefined
}

export type IPostalCodeProps = IInputProps & {
  country: string
}

export type ITextDateInputProps = IInputProps & {
  title: string
  data?: ICountry[] | null;
  isDate?: boolean;
}

export interface IValidation {
  isNotEmpty: boolean;
  isEmailGood?: boolean;
  isPasswordGood?: boolean;
  isDateGood?: boolean;
  isTextGood?: boolean;
  isMinLength?: boolean;
  isPostalCodeGood?: boolean;
  minLength?: number;
}

export interface IValidationRules {
  [index: string]: IValidation
}

export interface IQueryArgs {
  limit?: number,
  filter?: string | [],
  offset?: number,
  sort?: string,
  where?: string,
  [key: string]: string | number | string[] | undefined | boolean
}


