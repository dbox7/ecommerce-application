import { useState, useEffect } from 'react';
import { IMultiRangeProps } from '../../utils/types';

const useMultiRange = (min: string, max: string): IMultiRangeProps => {

  const [minRange, setMinRange] = useState(min);
  const [maxRange, setMaxRange] = useState(max);

  useEffect(() => {

    setMinRange(min);
    setMaxRange(max);

  }, [min, max]);

  const changeMinRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      
    setMinRange(Math
      .min(+event.target.value, +maxRange)
      .toString()
    );

  };

  const changeMaxRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
         
    setMaxRange(Math
      .max(+event.target.value, +minRange)
      .toString()
    );

  };

  return {
    min,
    max,
    minRange,
    maxRange,
    changeMinRangeHandler,
    changeMaxRangeHandler
  };
  
};

export default useMultiRange;