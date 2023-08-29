import { 
  Dispatch, 
  SetStateAction, 
  ChangeEventHandler
} from 'react';
import { 
  Customer, 
  Price, 
  Category 
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from
  '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export interface IAddress {
  id?: string;
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
  currentUser: Customer;
  apiMeRoot?: ByProjectKeyRequestBuilder;
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

export interface IInfoProps {
  text: string,
}

export interface IInputProps {
  title?: string;
  value: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  blurHandler: React.FocusEventHandler;
  activeState: boolean;
  valid: Partial<IValidation>;
  className?: string;
  children?: React.ReactNode;
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

export interface IPriceProps {
  price: Price,
  isMini?: boolean
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

export interface IAdressProps {
  addresses: IAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultBillingAddressIds: string | undefined;
  defaultShippingAddressIds: string | undefined;
}
export interface IQueryArgs {
  limit?: number,
  filter?: string | [],
  offset?: number,
  sort?: string,
  where?: string,
  [key: string]: string | number | string[] | undefined | boolean
}

export interface IUpdatePersonalInfo {
  updatePersonalInfo: (
    customerID: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    version: number,
  ) => void;
  error: string | null;
}

export interface IChangePassword {
  id: string;
  currentPassword:string;
  newPassword: string;
  version: number;
}


