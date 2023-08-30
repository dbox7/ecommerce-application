import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useServerApi } from '../../services/useServerApi';

import CPrice from '../../components/price/CPrice';
import CSizeOption from '../../components/sizeOption/CSizeOption';
import CViewImage from '../../components/viewImage/CViewImage';
import CButton from '../../components/button/CButton';

import './ProductPage.css';

const getSizeArray = (product: ProductProjection) => {
  
  return [
    product.masterVariant.attributes!.find(attr => attr.name === 'socks-sizes')?.value,
    ...product.variants.map(variant => 
      variant.attributes!.find(attr => 
        attr.name === 'socks-sizes')?.value)
  ];

};

export const ProductPage = () => {
 
  const props = useParams();
  
  const server = useServerApi();
  const [product, setProduct] = useState<ProductProjection>();  

  const productData = product?.masterVariant;
  
  const name = product?.name.en.split('-');
  const color = productData?.attributes!.find(attr => attr.name === 'BackColor')?.value.key;
  
  let sizes: number[] = [];

  if (product) {

    sizes = getSizeArray(product);    
  
  }
  

  useEffect(() => {

    server.GetProductById(props.id!, setProduct);  

  }, []);  

  return (
    product ? 
      <div className="product_page">
        <div className="view_image-wrap">
          <CViewImage 
            images={productData?.images!}
            color={color}
          />
        </div>
        <div className="product_info">
          <div className="product_info-text">
            <div className="product_title">
              {name![0].trim()}
              <br/>
              {name![1].trim()}
            </div>
            <div className="product_description">
              {product?.description!.en}
            </div>
          </div>
          <CPrice price={productData?.prices![0]!} />
          <CSizeOption sizes={sizes}/>
          <CButton 
            value="Add to cart +"
            type="button"
            extraClass="product_button"
          />
        </div>
      </div>
      :
      <div>Loading...</div>
  );

};
