import { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { MyCartDraft, ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { useServerApi } from '../../services/useServerApi';
import { ICrumbs } from '../../utils/types';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { getSizeArray } from '../../utils/usefullFuncs';
import { useShowMessage } from '../../services/useShowMessage';
import { msg } from '../../utils/constants';

import CPrice from '../../components/price/CPrice';
import CSizeOption from '../../components/sizeOption/CSizeOption';
import CViewImage from '../../components/viewImage/CViewImage';
import CButton from '../../components/button/CButton';
import CBreadcrumbs from '../../components/breadcrumbs/CBreadсrumbs';
import { CLoading } from '../../components/loading/CLoading';

import './ProductPage.css';


export const ProductPage: FC = () => {
  
  const showMessage = useShowMessage();
  const props = useParams();
  const server = useServerApi();
  const [crumbs, setCrumbs] = useState<ICrumbs[]>([
    { url: '/', name: 'Home' },
    { url: '/catalog', name: 'Catalog' },
  ]);

  const [product, setProduct] = useState<ProductProjection>();

  const { cart } = useTypedSelector(state => state.cart);

  const productData = product?.masterVariant;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);

  const name = product?.name.en.split('-');
  const color = productData?.attributes!.find(attr => attr.name === 'BackColor')?.value.key;
  const images = productData?.images!.slice(1)!;

  const [sizes, setSizes] = useState<string[]>([]);
  const [isFound, setIsFound] = useState<boolean>(false);

  const draft: MyCartDraft = {
    currency: 'USD',
  };

  const productQuantity = 1;


  useEffect(() => {

    server.GetProductById(props.id!, (data: ProductProjection) => { 

      setProduct(data); 
      setSelectedVariant(data.masterVariant); 

    });

  }, []);  

  useEffect(() => {

    if (product) {

      setCrumbs((prevCrumbs) => [
        ...prevCrumbs,
        { url: '', name: product?.name.en },
      ]);
      
      setSizes(getSizeArray(product));
    
    }
    
  
  }, [crumbs, product]);


  useEffect(() => {

    const selectedSize = selectedVariant?.attributes?.find((a) => a.name === 'size')?.value;
    const thisProducts = cart.lineItems?.filter((item) => item.productId === product?.id);

    if (thisProducts?.length) {

      let found = thisProducts.filter((item) => 
        item.variant.attributes?.find((a) => a.name === 'size' && a.value === selectedSize))?.length > 0;

      if (found) {

        setIsFound(true);

      } else {
          
        setIsFound(false);

      }

    }

  }, [cart, selectedVariant]);



  const removeFromCart = async () => {

    const item = cart.lineItems.find((v) => v.productId === product?.id);

    if (item) {

      setIsFound(false);
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

    const productVariant = selectedVariant!.id;
    
    return await server.addCartItem(
      id,
      version,
      productQuantity,
      productVariant,
      product!.id,
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
            <CSizeOption 
              product={product}
              sizes={sizes}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}/>
            {isFound ? 
              <CButton 
                value="Remove from cart -"
                type="button"
                extraClass="product_button"
                clickHandler={removeFromCart}   
              /> :
              <CButton 
                value="Add to cart"
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
