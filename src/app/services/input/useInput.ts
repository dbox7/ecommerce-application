import { useState } from 'react';
import useValidation from './useValidation';
import { IInputProps } from '../../utils/types';

const useInput = (initialValue: string, type: string, setFormBlocked?: Function): IInputProps => {

  const [value, setValue] = useState<string>(initialValue);
  const [activeState, setActiveState] = useState<boolean>(true);
  
  const valid = useValidation(value, type);

  const changeHandler = (event: React.ChangeEvent) => {
    
    setValue((event.target as HTMLInputElement).value);
    setActiveState(true);
  
  };

  const blurHandler = (event: React.ChangeEvent) => {

    setActiveState(false); 
    
  };

  return {
    value,
    changeHandler,
    blurHandler,
    activeState,
    valid
  };

};

export default useInput;