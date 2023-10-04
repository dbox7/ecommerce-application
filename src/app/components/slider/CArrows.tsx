import { useContext } from 'react';

import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

import { SliderContext } from './CSlider';

import './CSlider.css';

const CArrows = () => {

  const slider = useContext(SliderContext);

  return ( 
    <div className="arrow__wrap">
      <div className="arrow arrow__left" onClick={() => slider.changeSlide(-1)}>
        <MdOutlineArrowBackIosNew />
      </div>
      <div className="arrow arrow_right" onClick={() => slider.changeSlide(1)}>
        <MdOutlineArrowForwardIos />
      </div>
    </div>
  );

};
 
export default CArrows;