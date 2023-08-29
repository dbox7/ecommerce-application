import { useState } from 'react';
import useValidation from './useValidation';
import { IInputProps } from '../../utils/types';

const useInput = (initialValue: string, type: string, setHasChanges?: Function): IInputProps => {

  const [value, setValue] = useState(initialValue);
  const [activeState, setActiveState] = useState(true);
  
  const valid = useValidation(value, type);

  const changeHandler = (event: React.ChangeEvent) => {
    
    setValue((event.target as HTMLInputElement).value);
    setActiveState(true);
    if (setHasChanges) {

      setHasChanges(true);
    
    }
  
  };

  const blurHandler = () => {

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