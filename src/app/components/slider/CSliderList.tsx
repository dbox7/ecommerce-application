import { useContext, FC } from 'react';
import { SliderContext } from './CSlider';

import './CSlider.css';

const CSliderList: FC = () => {

  const slider = useContext(SliderContext);

  return ( 
    <div 
      className="slider-list"
      style={{ 
        transform: `translateX(-${slider.slideNumber * 100}%)`,
        transitionDuration: `${slider.transitionDuration / 1000}s`
      }}
    >
      {slider.slides.map((slide, idx) => (
        <div className="slide" key={idx}>
          <img src={slide.url} alt={slide.label} className="slide__img" />
        </div>
      ))}
    </div>
  );

};
 
export default CSliderList;