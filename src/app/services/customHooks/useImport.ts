import { useState } from 'react';
import useEmailValidation from './useEmailValidation';

const useInput = (initialValue: string) => {

  const [value, setValue] = useState(initialValue);
  const [activeState, setActiveState] = useState(true);
  const valid = useEmailValidation(value);

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