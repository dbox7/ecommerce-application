import { useState } from 'react';
import useValidation from './useValidation';
import { IInputProps } from '../../utils/types';

const useInput = (initialValue: string, type: string, setFormBlocked?: Function): IInputProps => {

  const [value, setValue] = useState(initialValue);
  const [activeState, setActiveState] = useState(true);
  
  const valid = useValidation(value, type);

  const changeHandler = (event: React.ChangeEvent) => {
    
    setValue((event.target as HTMLInputElement).value);
    setActiveState(true);
  
  };

  const blurHandler = (event: React.ChangeEvent) => {

    setActiveState(false); 
    
    // if (setFormBlocked && Object.entries(valid).length) {
      
    //   const res = Object.values(valid).reduce((res, item) => res && item, true);
      
    //   res ? setFormBlocked(false) : setFormBlocked(true);
    // }
    
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