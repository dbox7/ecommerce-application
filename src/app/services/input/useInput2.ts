import { useState } from 'react';
import useValidation from './useValidation2';
import { IInputProps } from '../../utils/types';

const useInput = (type: string, rules: Function[], initialValue: string = ''): IInputProps => {

  const [value, setValue] = useState(initialValue);
  const [activeState, setActiveState] = useState(true);
  
  const errors = useValidation(value, rules);

  const changeHandler = (event: React.ChangeEvent) => {
    
    setValue((event.target as HTMLInputElement).value);
    setActiveState(true);
  
  };

  const blurHandler = () => {

    setActiveState(false); 
    
  };

  return {
    value,
    type,
    changeHandler,
    blurHandler,
    activeState,
    errors
  };

};

export default useInput;