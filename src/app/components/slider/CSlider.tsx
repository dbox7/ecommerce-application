import { createContext, useEffect, useState } from 'react';
import { Image } from '@commercetools/platform-sdk';
import { TRANSITION_DURATION } from '../../utils/constants';

import CSliderList from './CSliderList';
import CArrows from './CArrows';

import './CSlider.css';

interface ISliderContext {
  slides: Image[]
  slideNumber: number
  changeSlide: Function
  transitionDuration: number
}

export const SliderContext = createContext<ISliderContext>({ 
  slides: [], 
  slideNumber: 0, 
  changeSlide: () => {}, 
  transitionDuration: TRANSITION_DURATION
});

interface ISliderProps {
  images: Image[]
}

const CSlider: React.FC<ISliderProps> = ({ images }) => {

  const [slides, setSlides] = useState([...images]);
  const [slideNumber, setSlideNumber] = useState(1);
  const [transitionDuration, SetTransitionDuration] = useState(300);

  useEffect(() => {

    setSlides([
      slides[slides.length - 1],
      ...images,
      slides[0]
    ]);

  }, []);

  const changeSlide = (direction: number) => {

    const offset = slideNumber + direction;

    if (offset === slides.length - 1) {

      setTimeout(() => {

        SetTransitionDuration(0);
        setSlideNumber(1);
      
      }, TRANSITION_DURATION);

    }

    if (offset === 0) {

      setTimeout(() => {

        SetTransitionDuration(0);
        setSlideNumber(slides.length - 2);
      
      }, TRANSITION_DURATION);

    }

    SetTransitionDuration(300);
    setSlideNumber(slideNumber + direction);

  };

  return ( 
    <>
      <SliderContext.Provider
        value={{
          slides,
          slideNumber,
          changeSlide,
          transitionDuration
        }}
      >
        <div className="slider">
          <CSliderList />
          <CArrows />
        </div>
      </SliderContext.Provider>
    </>
  );

};
 
export default CSlider;