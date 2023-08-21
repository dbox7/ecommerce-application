import { Customer, Product, ProductData, ProductVariant } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export interface IButtonProps {
  value: string,
  clickHandler?: React.MouseEventHandler,
  type: 'button' | 'submit' | 'reset',
  disabled?: boolean,
}

export interface ICountry {
  name: string,
  code: string,
  postalCode: RegExp
}

export interface IGlobalStoreType {
  currentUser: Customer,
  apiMeRoot?: ByProjectKeyRequestBuilder,
}

export interface IInputProps {
  value: string;
  changeHandler: React.ChangeEventHandler;
  blurHandler: React.FocusEventHandler;
  activeState: boolean;
  valid: Partial<IValidation>;
}

export interface SearchBarProps {
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