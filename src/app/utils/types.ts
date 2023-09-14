import { 
  Dispatch, 
  SetStateAction, 
  ChangeEventHandler,
  ChangeEvent
} from 'react';
import { 
  Cart,
  Customer, 
  Price, 
  Image
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from
  '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

// ------------------------------------------------------------------------------------------------------------------ IAction
export type IAction = 'setDefaultShippingAddress'
| 'changeAddress'
| 'addShippingAddressId'
| 'removeShippingAddressId'
| 'setDefaultBillingAddress'
| 'addBillingAddressId'
| 'removeBillingAddressId'
| 'addLineItem'
| 'removeLineItem';

// ------------------------------------------------------------------------------------------------------------------ IAddress
export interface IAddress {
  id?: string
  streetName: string
  city: string
  postalCode: string
  country: string
}

// ------------------------------------------------------------------------------------------------------------------ IAdressProps
export interface IAdressProps {
  addresses: IAddress[]
  shippingAddressIds: string[]
  billingAddressIds: string[]
  defaultBillingAddressIds: string | undefined
  defaultShippingAddressIds: string | undefined
}

// ------------------------------------------------------------------------------------------------------------------ IAddAdrdressProps
export interface IAddAdrdressProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

// ------------------------------------------------------------------------------------------------------------------ IButtonProps
export interface IButtonProps {
  value: string
  type: 'button' | 'submit' | 'reset'
  clickHandler?: React.MouseEventHandler
  disabled?: boolean
  extraClass?: string
}

// ------------------------------------------------------------------------------------------------------------------ ICategoriesListProps
export interface ICategoriesListProps { 
  filters: IProductFilters
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}

// ------------------------------------------------------------------------------------------------------------------ IChangePassword
export interface IChangePassword {
  id: string
  currentPassword:string
  newPassword: string
  version: number
}

// ------------------------------------------------------------------------------------------------------------------ ICheckboxProps
export interface ICheckboxProps {
  title: string
  checked: boolean
  changeHandler: React.ChangeEventHandler
}

// ------------------------------------------------------------------------------------------------------------------ ICountry
export interface ICountry {
  name: string
  code: string
  postalCode: RegExp
}

// ------------------------------------------------------------------------------------------------------------------ ICrumbs
export interface ICrumbs {
  url: string;
  name: string;
} 

// ------------------------------------------------------------------------------------------------------------------ IDeveloperCard
export interface IDeveloper {
  name: string;
  role: string;
  bio: string;
  photo: string;
  email: string;
  telegram: string;
  github: string;
}

// ------------------------------------------------------------------------------------------------------------------ IEditAdrdressProps
export interface IEditAdrdressProps {
  setModal: Dispatch<SetStateAction<boolean>> | ((isActive: boolean) => void);
  addressId: string | undefined;
}

// ------------------------------------------------------------------------------------------------------------------ IFiltersProps
export interface IFiltersProps { 
  filters: IProductFilters
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}

// ------------------------------------------------------------------------------------------------------------------ IGlobalStoreType
export interface IGlobalStoreType {
  currentUser: Customer
  apiMeRoot?: ByProjectKeyRequestBuilder,
  loading: boolean,
  msg: { body: string, error: boolean }
}

// ------------------------------------------------------------------------------------------------------------------ IInfoProps
export interface IInfoProps {
  text: string
}

// ------------------------------------------------------------------------------------------------------------------ IInputProps
export interface IInputProps {
  title?: string
  value: string
  changeHandler: ChangeEventHandler<HTMLInputElement>
  blurHandler: React.FocusEventHandler
  activeState: boolean
  valid: Partial<IValidation>
  className?: string
  children?: React.ReactNode
}

// ------------------------------------------------------------------------------------------------------------------ IModalProps
export interface IModalProps {
  children: React.ReactNode;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>> | ((isActive: boolean) => void);
}

// ------------------------------------------------------------------------------------------------------------------ IMultiRangeProps
export interface IMultiRangeProps {
  min: string
  max: string
  minRange: string
  maxRange: string
  changeMinRangeHandler: ChangeEventHandler<HTMLInputElement>
  changeMaxRangeHandler: ChangeEventHandler<HTMLInputElement>
}

// ------------------------------------------------------------------------------------------------------------------ IProductFilters
export interface IProductFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
  categoryId?: string
  sizes?: string[]
  brands?: string[]
  sort: string
  [key: string]: any
}

// ------------------------------------------------------------------------------------------------------------------ IProductListProps
export interface IProductListProps {
  filters: IProductFilters
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}

// ------------------------------------------------------------------------------------------------------------------ IPayload
export interface IPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  addresses: IAddress[]
  shippingAddress: number[]
  defaultShippingAddress: number | undefined
  billingAddress: number[]
  defaultBillingAddress: number | undefined
}

// ------------------------------------------------------------------------------------------------------------------ IPostalCodeProps
export type IPostalCodeProps = IInputProps & {
  country: string
}

// ------------------------------------------------------------------------------------------------------------------ IPriceProps
export interface IPriceProps {
  price: Price
  isMini?: boolean
}

// ------------------------------------------------------------------------------------------------------------------ ISortProductsProps
export interface ISortProductsProps {
  filters: IProductFilters
  setFilters: Dispatch<SetStateAction<IProductFilters>>
}

// ------------------------------------------------------------------------------------------------------------------ ISearchBarProps
export interface ISearchBarProps {
  onSearch: (query: string) => void;
}

// ------------------------------------------------------------------------------------------------------------------ ISliderContext
export interface ISliderContext {
  slides: Image[]
  slideNumber: number
  changeSlide: Function
  transitionDuration: number
}

// ------------------------------------------------------------------------------------------------------------------ ITextDateInputProps
export type ITextDateInputProps = IInputProps & {
  title: string
  data?: ICountry[] | null
  isDate?: boolean
}

// ------------------------------------------------------------------------------------------------------------------ IToastify
export interface IToastify {
  error?: string;
  success?: string;
}

// ------------------------------------------------------------------------------------------------------------------ IQueryArgs
export interface IQueryArgs {
  limit?: number
  filter?: string[]
  offset?: number
  sort?: string
  where?: string
  [key: string]: string | number | string[] | undefined | boolean
}

// ------------------------------------------------------------------------------------------------------------------ IUpdatePersonalInfo
export interface IUpdatePersonalInfo {
  updatePersonalInfo: (
    customerID: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    version: number,
  ) => void
  error: string | null
}

// ------------------------------------------------------------------------------------------------------------------ IUseInputChangesResult
export type IUseInputChangesResult = {
  inputValue: string;
  hasChanged: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  saveChanges: () => void;
}

// ------------------------------------------------------------------------------------------------------------------ IValidation
export interface IValidation {
  isNotEmpty: boolean
  isEmailGood?: boolean
  isPasswordGood?: boolean
  isDateGood?: boolean
  isTextGood?: boolean
  isMinLength?: boolean
  isPostalCodeGood?: boolean
  minLength?: number
}

// ------------------------------------------------------------------------------------------------------------------ IValidationRules
export interface IValidationRules {
  [index: string]: IValidation
}
