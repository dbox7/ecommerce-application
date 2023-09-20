import { ChangeEventHandler } from 'react';


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

// ------------------------------------------------------------------------------------------------------------------ IChangePassword
export interface IChangePassword {
  id: string
  currentPassword:string
  newPassword: string
  version: number
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

// ------------------------------------------------------------------------------------------------------------------ IQueryArgs
export interface IQueryArgs {
  limit?: number
  filter?: string[]
  offset?: number
  sort?: string
  where?: string
  [key: string]: string | number | string[] | undefined | boolean
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
