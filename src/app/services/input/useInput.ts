import { useState } from 'react';
import useValidation from './useValidation';
import { IInputProps } from '../../utils/types';

const useInput = (initialValue: string, type: string): IInputProps => {

  const [value, setValue] = useState(initialValue);
  const [activeState, setActiveState] = useState(true);
 
  const errors = [''];
  const valid = useValidation(value, type);

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
    errors,
    changeHandler,
    blurHandler,
    activeState,
    valid
  };

};

export default useInput;