import { useState } from 'react';
import useValidation from './useValidation2';
import { IInputProps } from '../../utils/types';

const useInput = (type: string, rules: Function[], initialValue: string = ''): IInputProps => {

  const [value, setValue] = useState(initialValue);
  const [prevValue, setPrevValue] = useState(initialValue);
  const [hasChanged, setHasChanged] = useState(false);
  const [activeState, setActiveState] = useState(true);
  
  const errors = useValidation(value, rules);

  const changeHandler = (event: React.ChangeEvent) => {

    const value = (event.target as HTMLInputElement).value;
    
    prevValue !== value ? setHasChanged(true) : setHasChanged(false);

    setValue(value);
    setActiveState(true);
  
  };

  const blurHandler = (event: React.FocusEvent) => {

    setPrevValue((event.target as HTMLInputElement).value);
    setActiveState(false);
    
  };

  return {
    value,
    type,
    changeHandler,
    blurHandler,
    activeState,
    hasChanged,
    errors
  };

};

export default useInput;