import { Dispatch, SetStateAction } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { Customer } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export interface IButtonProps {
  value: string,
  clickHandler?: React.MouseEventHandler,
  type: 'button' | 'submit' | 'reset',
  disabled?: boolean,
}

export interface ICategoriesListProps { 
  categories: Category[]
  filters: IProductFilters,
  setFilters: Dispatch<SetStateAction<IProductFilters>>
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
  sort?: string
}

export interface IProductListProps {
  filters: IProductFilters
}

export interface IInputProps {
  value: string;
  changeHandler: React.ChangeEventHandler;
  blurHandler: React.FocusEventHandler;
  activeState: boolean;
  valid: Partial<IValidation>;
}

export interface ISearchBarProps {
  onSearch: (query: string) => void;
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
  [key: string]: string | number | string[] | undefined
}
