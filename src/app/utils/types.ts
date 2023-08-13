// Размещаем типы в алфавитном порядке по второй букве имени (первая всегда I)

export interface IButtonProps {
  value: string,
  clickHandler?: React.MouseEventHandler,
  type: 'button' | 'submit' | 'reset',
  disabled?: boolean,
}

export interface IInputProps {
  value: string;
  changeHandler: React.ChangeEventHandler;
  blurHandler: React.FocusEventHandler;
  activeState: boolean;
  valid: IValidation;
}

export interface IValidation {
  isEmpty: boolean;
  isEmailGood?: boolean;
  isPasswordGood?: boolean;
  isDateGood?: boolean;
  isTextGood?: boolean;
  isMinLength?: boolean;
  isPostalCodeGood?: boolean;
  minLength?: number;
}

export interface ICountry {
  name: string,
  code: string,
  postalCode: RegExp
}