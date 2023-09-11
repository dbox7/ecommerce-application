import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MyCartDraft, ProductProjection } from '@commercetools/platform-sdk';
import { useServerApi } from '../../services/useServerApi';
import { CLoading } from '../../components/loading/CLoading';
import { ICrumbs } from '../../utils/types';

import CPrice from '../../components/price/CPrice';
import CSizeOption from '../../components/sizeOption/CSizeOption';
import CViewImage from '../../components/viewImage/CViewImage';
import CButton from '../../components/button/CButton';
import CBreadcrumbs from '../../components/breadcrumbs/CBreadсrumbs';

import './ProductPage.css';
import useIsItemInCart from '../../services/useIsItemInCart';
import { getSizeArray } from '../../utils/useFullFuncs';
import { GlobalContext } from '../../store/GlobalContext';


export const ProductPage = () => {
  
  const props = useParams();
  const [crumbs, setCrumbs] = useState<ICrumbs[]>([]);

  const [product, setProduct] = useState<ProductProjection>();  

  const productData = product?.masterVariant;
  
  const name = product?.name.en.split('-');
  const color = productData?.attributes!.find(attr => attr.name === 'BackColor')?.value.key;
  const images = productData?.images!.slice(1)!;

  const isDuplicatedProduct = useIsItemInCart(product?.id);
  
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


  const [globalStore] = useContext(GlobalContext);

  const server = useServerApi();

  const draft: MyCartDraft = {
    currency: 'USD',
  };
  const productQuantity = 1;
  const productVariant = 1;

  const handleCart = async (e: React.MouseEvent<HTMLElement>) => {

    e.preventDefault();
    e.stopPropagation();

    if (!globalStore.cart.id) {

      try {

        const newCart = await server.createCart(draft);

        if (product) {

          server.addCartItem(
            newCart.id,
            newCart.version,
            productVariant,
            productQuantity,
            product.id
          );
        
        }
      
      } catch (error) {

        console.error('Ошибка при создании корзины:', error);
      
      }
    
    } else {

      if (product) {

        server.addCartItem(
          globalStore.cart.id,
          globalStore.cart.version,
          productVariant,
          productQuantity,
          product.id
        );
      
      }
    
    }
  
  };
  
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
              disabled={isDuplicatedProduct}
              clickHandler={handleCart}
            />
          </div>
        </div> 
      </div>
      :
      <CLoading/>
  );

};
