import { useCallback, useEffect, useRef, useState } from 'react';
import useInput from '../../../services/input/useInput';

import './CRange.css';

const CRange = ({min, max}:{min: number, max: number}) => {

  const range = useRef<HTMLDivElement>(null);

  const minRange = useInput('20', 'range', undefined);
  const maxRange = useInput('100', 'range', undefined);
  const [minimal, setMinimal] = useState(String(min));
  const [maximum, setMaximum] = useState(String(max));

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]
  );

  useEffect(() => {

    console.log(minRange.value, maxRange.value);
    
    const minPercent = getPercent(+minRange.value);
    const maxPercent = getPercent(+maxRange.value); 

    if (range.current) {

      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    
    }

    minimal >= maxRange.value ? setMinimal(maximum) : setMinimal(minRange.value);
    maximum <= minRange.value ? setMaximum(minimal) : setMaximum(maxRange.value);
    // setMinimal(minRange.value);

  }, [maxRange.value, minRange.value]);

  const checkBorderValue = (isMin: boolean): string =>  {

    let res = '';
    
    if (isMin) {

      res = Math.min(+minRange.value, +maxRange.value).toString();
      minRange.value = Math.min(+minRange.value, +maxRange.value).toString();
      
      console.log('min: ' + res);
      return res;
      

    } else {

      res = Math.max(+minRange.value, +maxRange.value).toString();
      maxRange.value = res;
      console.log('max: ' + res);
      return res;

    }

  };
  
  return ( 
    <div className="range-wrap">
      <label htmlFor="minRange" className="label_min">${10}</label>
      <input 
        name="minRange"
        type="range" 
        min={min}
        max={max}
        value={minimal}
        className={'thumb thumb_z-idx-' + (+minRange.value > +maxRange.value - 5 ? '5' : '3')}
        onChange={minRange.changeHandler}
      />
      <label htmlFor="maxRange" className="label_max">${10}</label>
      <input 
        name="maxRange"
        type="range"
        min={min}
        max={max}
        value={maximum} 
        className="thumb thumb_z-idx-4"
        onChange={maxRange.changeHandler}
      />

      <div className="slider__track" />
      <div className="slider__range" ref={range} />
      
    </div>  
  );

};
  
export default CRange;