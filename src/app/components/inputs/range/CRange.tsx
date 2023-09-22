import { 
  FC, 
  useCallback, 
  useEffect, 
  useRef 
} from 'react';
import { IMultiRangeProps } from '../../../utils/types';

import './CRange.css';

const CRange: FC<IMultiRangeProps> = (multiRange) => {

  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - +multiRange.min) / (+multiRange.max - +multiRange.min)) * 100), 
    [multiRange.min, multiRange.max]);

  useEffect(() => {

    const minPercent = getPercent(+multiRange.minRange);
    const maxPercent = getPercent(+multiRange.maxRange); 

    if (range.current) {

      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    
    }

  }, [multiRange.minRange, multiRange.maxRange]);
  
  return ( 
    <div className="range">
      <div className="range-wrap">
        <label htmlFor="minRange" className="label_min">${multiRange.minRange}</label>
        <input 
          name="minRange"
          type="range" 
          min={+multiRange.min}
          max={+multiRange.max}
          value={multiRange.minRange}
          className={'thumb thumb_z-idx-' + (+multiRange.minRange > +multiRange.maxRange - 5 ? '5' : '3')}
          onChange={multiRange.changeMinRangeHandler}
        />
        <label htmlFor="maxRange" className="label_max">${multiRange.maxRange}</label>
        <input 
          name="maxRange"
          type="range"
          min={+multiRange.min}
          max={+multiRange.max}
          value={multiRange.maxRange} 
          className="thumb thumb_z-idx-4"
          onChange={multiRange.changeMaxRangeHandler}
        />
        <div className="slider__track" />
        <div className="slider__range" ref={range} />
      </div>
    </div>
  );

};
  
export default CRange;