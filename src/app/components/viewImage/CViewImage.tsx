import { Image } from '@commercetools/platform-sdk';
import { useRef, useState } from 'react';

import './CViewImage.css';

const CViewImage = ({images, color}: {images: Image[], color: string}) => {

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const imgElement = useRef(null);

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
      <div className={'viewImage_main ' + color}>
        <img src={selectedImage.url} alt="Product" className="image_main" />
      </div>
      <div 
        className="viewImage_variants" 
        onClick={changeImage}
        ref={imgElement}  
      >
        {
          images.map(image => (
            <div 
              id={image.label} 
              className={'image_variant_wrap ' + color} 
              key={image.label}
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