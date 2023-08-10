// Размещаем типы в алфавитном порядке по второй букве имени (первая всегда I)

export interface IButtonProps {
  value: string,
  clickHandler?: React.MouseEventHandler,
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
}