import { useContext } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { SliderContext } from './CSlider';

import './CSlider.css';

const CArrows = () => {

  const slider = useContext(SliderContext);

  return ( 
    <div className="arrow__wrap">
      <div className="arrow arrow__left" onClick={() => slider.changeSlide(-1)}>
        <BiLeftArrowAlt />
      </div>
      <div className="arrow arrow_right" onClick={() => slider.changeSlide(1)}>
        <BiLeftArrowAlt />
      </div>
    </div>
  );

};
 
export default CArrows;