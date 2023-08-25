import { useContext, useEffect, useState } from 'react';
import { apiAnonRoot } from '../../ctp';
import { GlobalContext } from '../../store/GlobalContext';
import { useParams } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import CViewImage from '../../components/viewImage/CViewImage';
import CButton from '../../components/button/CButton';

import './ProductPage.css';
import CPrice from '../../components/price/CPrice';
import CSizeOption from '../../components/sizeOption/CSizeOption';


function GetProduct(id: string) {

  const [globalStore] = useContext(GlobalContext);
  const [product, setProduct] = useState<ProductProjection>();
  const [error, setError] = useState<string>('');

  useEffect(() => {

    let api;

    if (globalStore.currentUser.id) {
  
      api = globalStore.apiMeRoot;
  
    } else {
  
      api = apiAnonRoot;
  
    }
  
    api?.productProjections()
      .withId({ID: id as string})
      .get().execute().then(res => {
        
        setProduct(res.body);
        
      }).catch(err => {
        
        setError(err);        
        
      });

  }, []);
  

  return { product, error };
  
}

export function ProductPage() {
 
  const props = useParams();
  
  const product = GetProduct(props.id!).product;
  const productData = product?.masterVariant;  

  return (
    product ? 
      <div className="product_page">
        <div className="view_image-wrap">
          <CViewImage 
            images={productData?.images!}
            color={productData?.attributes![0].value.key}
          />
        </div>
        <div className="product_info">
          <div className="product_info-text">
            <div className="product_title">
              {product?.name.en}
            </div>
            <div className="product_description">
              {product?.description!.en}
            </div>
          </div>
          <CPrice price={productData?.prices![0]!} />
          <CSizeOption {...[]}/>
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