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
}