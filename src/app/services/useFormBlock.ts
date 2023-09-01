import { useEffect, useState } from 'react';


const UseFormBlock = (depends: boolean[]): boolean => {
  
  const [formBlocked, setFormBlocked] = useState<boolean>(true);
  
  useEffect(() => {

    depends.reduce((res, item) => res && item, true) ? 
      setFormBlocked(false) 
      : 
      setFormBlocked(true);
  
  }, depends);

  return formBlocked;

};

export default UseFormBlock;