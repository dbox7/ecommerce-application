import { MyCartDraft, ProductProjection } from '@commercetools/platform-sdk';
import { useServerApi } from '../../../services/useServerApi';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { msg } from '../../../utils/constants';
import { useShowMessage } from '../../../services/useShowMessage';

import CPrice from '../../price/CPrice';

import { BsCart2 } from 'react-icons/bs';

import './CProductCard.css';


export const CProductCard = ({ product }: { product: ProductProjection }) => {

  const { cart } = useTypedSelector(state => state.cart);

  const server = useServerApi();
  const showMessage = useShowMessage();

  const draft: MyCartDraft = {
    currency: 'USD',
  };
  const productQuantity = 1;
  const productVariant = 1;


  const item = cart.lineItems.find((v) => v.productId === product?.id);

  const addCartItem = async (id = cart.id, version = cart.version) => {   

    return await server.addCartItem(
      id,
      version,
      productVariant,
      productQuantity,
      product.id
    );

  };

  const handleClick = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    
    e.preventDefault();
    e.stopPropagation();

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
    <div className="product-card">
      <img src={ product.masterVariant.images![0].url } alt={ product.name.toString() } />
      <div className="product-card__container">
        <div className="product-card__name-and-price">
          <div className="product-card__name">{ product.name.en }</div>
          <CPrice 
            price={product.masterVariant.prices![0]} 
            isMini={true} 
          />
        </div>
        {item? 
          <BsCart2 className="product-card__icon cart-icon disabled" onClick={handleClick}/>
          : 
          <BsCart2 className="product-card__icon cart-icon" onClick={handleClick}/>
        }
      </div>
    </div>
  );

};