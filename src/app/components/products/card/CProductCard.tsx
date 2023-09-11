import { MyCartDraft, ProductProjection } from '@commercetools/platform-sdk';

import CPrice from '../../price/CPrice';

import { BsCart2 } from 'react-icons/bs';

import './CProductCard.css';
import { useContext } from 'react';
import { GlobalContext } from '../../../store/GlobalContext';
import { useServerApi } from '../../../services/useServerApi';

export const CProductCard = ({ product }: { product: ProductProjection }) => {

  const [globalStore] = useContext(GlobalContext);

  const server = useServerApi();

  const draft: MyCartDraft = {
    currency: 'USD',
  };
  const productQuantity = 1;
  const productVariant = 1;

  const handleCart = async (e: React.MouseEvent<SVGSVGElement>) => {

    e.preventDefault();
    e.stopPropagation();

    if (!globalStore.cart.id) {

      try {

        const newCart = await server.createCart(draft);

        server.addCartItem(
          newCart.id,
          newCart.version,
          productVariant,
          productQuantity,
          product.id
        );
      
      } catch (error) {

        console.error('Ошибка при создании корзины:', error);
      
      }
    
    } else {

      server.addCartItem(
        globalStore.cart.id,
        globalStore.cart.version,
        productVariant,
        productQuantity,
        product.id
      );
    
    }
  
  };

  /*   const name = product.name.en.split(/.-./);

  name[0] = name[0].replace(' ', ' ');
  name[1] = name[1].replace(' ', ' '); */

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
        <BsCart2 className="product-card__icon cart-icon" onClick={handleCart}/>
      </div>
    </div>
  );

};