import { Image } from '@commercetools/platform-sdk';
import { useRef, useState, FC } from 'react';

import { RxCross2 } from 'react-icons/rx';
import CSlider from '../slider/CSlider';

import './CViewImage.css';

interface IViewImageProps {
  images: Image[];
  color: string;
}

const CViewImage: FC<IViewImageProps> = ({images, color}) => {

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const imgElement = useRef(null);

  const [isActiveSlider, setIsActiveSlider] = useState(false);
  
  document.body.style.overflow = isActiveSlider ? 'hidden' : '';

  function changeImage(event: React.MouseEvent) {

    event.stopPropagation();

    if (imgElement.current === event.target) {

      return;
    
    }
    
    const variant = Array.from((imgElement.current! as HTMLElement).children)
      .find(item => item.id === (event.target as HTMLImageElement).alt);
    
    const newImg = images.find(image => image.label === variant!.id);    

    setSelectedImage(newImg!);

  }
  
  return ( 
    <div className="viewImage">
      { isActiveSlider && 
        <>
          <CSlider images={images} />
          <div className="backplate" onClick={() => setIsActiveSlider(false)}>
            <RxCross2 className="backplate__close-icon"/> 
          </div>
        </>
      }
      <div className={'viewImage_main ' + color}>
        <img 
          src={selectedImage.url} 
          alt="Product" 
          className="image_main"
          onClick={() => setIsActiveSlider(true)}
        />
      </div>
      <div 
        className="viewImage_variants" 
        onClick={changeImage}
        ref={imgElement}  
      >
        {
          images.map((image, idx) => (
            <div 
              id={image.label} 
              className={'image_variant_wrap ' + color} 
              key={idx}
            >
              <img 
                src={image.url} 
                alt={image.label} 
                className={image.label === selectedImage.label ? 
                  'image_variant selected' 
                  :
                  'image_variant'} 
              />
            </div>
          ))
        }
      </div>
    </div>
  );

};
 
export default CViewImage;