import { MyCartDraft, ProductProjection } from '@commercetools/platform-sdk';
import { useServerApi } from '../../../services/useServerApi';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';

import CPrice from '../../price/CPrice';

import { BsCart2 } from 'react-icons/bs';

import './CProductCard.css';


export const CProductCard = ({ product }: { product: ProductProjection }) => {

  const { cart } = useTypedSelector(state => state.cart);

  const server = useServerApi();

  const draft: MyCartDraft = {
    currency: 'USD',
  };
  const productQuantity = 1;
  const productVariant = 1;


  const addCartItem = (id = cart.id, version = cart.version) => {   

    server.addCartItem(
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

    if (!cart.id) {

      const newCart = await server.createCart(draft);

      if (typeof newCart === 'object') {      
        
        addCartItem(newCart.id, newCart.version);      

      }
    
    } 
    
    if (cart.id) {

      addCartItem();

    }
      
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
        <BsCart2 className="product-card__icon cart-icon" onClick={handleClick}/>
      </div>
    </div>
  );

};