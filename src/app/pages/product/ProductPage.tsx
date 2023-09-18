import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MyCartDraft, ProductProjection } from '@commercetools/platform-sdk';
import { useServerApi } from '../../services/useServerApi';
import { ICrumbs } from '../../utils/types';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { getSizeArray } from '../../utils/useFullFuncs';
import { useShowMessage } from '../../services/useShowMessage';
import { msg } from '../../utils/constants';

import CPrice from '../../components/price/CPrice';
import CSizeOption from '../../components/sizeOption/CSizeOption';
import CViewImage from '../../components/viewImage/CViewImage';
import CButton from '../../components/button/CButton';
import CBreadcrumbs from '../../components/breadcrumbs/CBreadсrumbs';
import { CLoading } from '../../components/loading/CLoading';

import './ProductPage.css';


export const ProductPage = () => {
  
  const showMessage = useShowMessage();
  const props = useParams();
  const server = useServerApi();
  const [crumbs, setCrumbs] = useState<ICrumbs[]>([]);

  const [product, setProduct] = useState<ProductProjection>();
  const { cart } = useTypedSelector(state => state.cart);

  const productData = product?.masterVariant;
  
  const name = product?.name.en.split('-');
  const color = productData?.attributes!.find(attr => attr.name === 'BackColor')?.value.key;
  const images = productData?.images!.slice(1)!;
  const item = cart.lineItems?.filter((v) => v.productId === product?.id)[0];

  const [sizes, setSizes] = useState<string[]>([]);

  const draft: MyCartDraft = {
    currency: 'USD',
  };
  const productQuantity = 1;
  const productVariant = 1;

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

    if (product) {

      setSizes(getSizeArray(product));    
    
    }
    
  
  }, [product]);

  const removeFromCart = async () => {

    const item = cart.lineItems.find((v) => v.productId === product?.id);

    if (item) {

      const res = await server.removeCartItem(
        cart.id,
        cart.version,
        item.quantity,
        item.id
      );

      res === 'success' ?
        showMessage(msg.PRODUCT_REMOVE_SUCCESS)
        :
        showMessage(msg.PRODUCT_REMOVE_ERROR);

    }

  };

  const addCartItem = async (id = cart.id, version = cart.version) => {

    return await server.addCartItem(
      id,
      version,
      productVariant,
      productQuantity,
      product!.id
    );

  };

  const addToCart = async () => {

    let res: string = '';

    if (!cart.id) {

      const newCart = await server.createCart(draft);

      if (typeof newCart === 'object') {

        res = await addCartItem(newCart.id, newCart.version);

      }

    } 

    if (cart.id) {

      res = await addCartItem();

    } 

    res && res === 'success' ?
      showMessage(msg.PRODUCT_ADD_SUCCESS)
      :
      showMessage(msg.PRODUCT_ADD_ERROR);

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
            {item ? 
              <CButton 
                value="Remove from cart -"
                type="button"
                extraClass="product_button"
                clickHandler={removeFromCart}
              />
              :
              <CButton 
                value="Add to cart +"
                type="button"
                extraClass="product_button"
                clickHandler={addToCart}
              />
            }
          </div>
        </div> 
      </div>
      :
      <CLoading/>
  );

};
