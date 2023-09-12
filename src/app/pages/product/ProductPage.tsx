import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useServerApi } from '../../services/useServerApi';
import { CLoading } from '../../components/loading/CLoading';
import { ICrumbs } from '../../utils/types';
import useToastify from '../../services/useToastify';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import CPrice from '../../components/price/CPrice';
import CSizeOption from '../../components/sizeOption/CSizeOption';
import CViewImage from '../../components/viewImage/CViewImage';
import CButton from '../../components/button/CButton';
import CBreadcrumbs from '../../components/breadcrumbs/CBreadсrumbs';

import './ProductPage.css';


const getSizeArray = (product: ProductProjection) => {
  
  return [
    product.masterVariant.attributes!.find(attr => attr.name === 'size')?.value,
    ...product.variants.map(variant => 
      variant.attributes!.find(attr => 
        attr.name === 'size')?.value)
  ];

};

export const ProductPage = () => {
  
  const notify = useToastify();
  const props = useParams();
  const [crumbs, setCrumbs] = useState<ICrumbs[]>([]);

  const server = useServerApi();
  const [product, setProduct] = useState<ProductProjection>();  
  const { msg } = useTypedSelector(state => state.products);

  const productData = product?.masterVariant;
  
  const name = product?.name.en.split('-');
  const color = productData?.attributes!.find(attr => attr.name === 'BackColor')?.value.key;
  const images = productData?.images!.slice(1)!;
  
  let sizes: number[] = [];

  if (product) {

    sizes = getSizeArray(product);    
  
  }
  
  useEffect(() => {

    server.GetProductById(props.id!, setProduct);  
  
  }, []);  

  useEffect(() => {

    let c: ICrumbs[] = [];

    c = [{url: '/', name: 'Home'}];

    c[1] = {'url': '/catalog', name: 'Catalog'};
    if (product) {

      c[2] = {url: '', name: product?.name.en};
    
    }
    setCrumbs(c); 
  
  }, [product]);

  useEffect(() => {

    if (msg.body !== '') {

      msg.error ? 
        notify({ error: msg.body })
        :
        notify({ success: msg.body });

    }

  }, [msg]);
  
  return (
    product ? 
      <div className="product-page">
        <div className="breadcrums__wrap">
          <CBreadcrumbs crumbs={crumbs}/>
        </div>
        <div className="product-page__wrap">
          <div className="view_image-wrap">
            <CViewImage 
              images={images}
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
      </div>
      :
      <CLoading/>
  );

};
