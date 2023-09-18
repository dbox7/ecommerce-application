import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MyCartDraft, ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { useServerApi } from '../../services/useServerApi';
import { CLoading } from '../../components/loading/CLoading';
import { ICrumbs } from '../../utils/types';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { getSizeArray } from '../../utils/useFullFuncs';
import { useShowMessage } from '../../services/useShowMessage';

import CPrice from '../../components/price/CPrice';
import CSizeOption from '../../components/sizeOption/CSizeOption';
import CViewImage from '../../components/viewImage/CViewImage';
import CButton from '../../components/button/CButton';
import CBreadcrumbs from '../../components/breadcrumbs/CBreadсrumbs';

import './ProductPage.css';


export const ProductPage = () => {
  
  const showMessage = useShowMessage();
  const props = useParams();
  const server = useServerApi();
  const [crumbs, setCrumbs] = useState<ICrumbs[]>([]);

  const [product, setProduct] = useState<ProductProjection>();
  const { msg } = useTypedSelector(state => state.products);
  const { cart, msg: msg_cart } = useTypedSelector(state => state.cart);
  const productData = product?.masterVariant;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product?.masterVariant!);



  const name = product?.name.en.split('-');
  const color = productData?.attributes!.find(attr => attr.name === 'BackColor')?.value.key;
  const images = productData?.images!.slice(1)!;
  const item = cart.lineItems.filter((v) => v.productId === product?.id)[0];
  const quantity = cart.totalLineItemQuantity;

  let sizes: number[] = [];

  const draft: MyCartDraft = {
    currency: 'USD',
  };
  const productQuantity = 1;
  const productVariant = 1;

  
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

    showMessage(msg);
    showMessage(msg_cart);

  }, [msg, msg_cart]);

  const handleCart = (e: React.MouseEvent<HTMLElement>) => {

    e.preventDefault();
    e.stopPropagation();

    if (!cart) {

      server.createCart(draft);
    
    };
    
    if (cart) {

      if (item) {
        
        server.removeCartItem(
          cart.id,
          cart.version,
          quantity!,
          item.id
          
        );
        server.getCart(
          cart.id,
        );

      } else {

        server.addCartItem(
          cart.id,
          cart.version,
          productVariant,
          productQuantity,
          product!.id
        );
        server.getCart(
          cart.id,
        );

      }

    };

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
            <CSizeOption 
              product={product}
              sizes={sizes}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}/>
            {item ? 
              <CButton 
                value="Remove from cart -"
                type="button"
                extraClass="product_button"
                clickHandler={handleCart}
              />
              :
              <CButton 
                value="Add to cart +"
                type="button"
                extraClass="product_button"
                clickHandler={handleCart}
              />
            }
          </div>
        </div> 
      </div>
      :
      <CLoading/>
  );

};
