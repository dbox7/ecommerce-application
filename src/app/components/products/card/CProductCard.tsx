
import { MyCartDraft, ProductProjection } from '@commercetools/platform-sdk';
import { useServerApi } from '../../../services/useServerApi';
import CPrice from '../../price/CPrice';
import { BsCart2 } from 'react-icons/bs';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import './CProductCard.css';


export const CProductCard = ({ product }: { product: ProductProjection }) => {

  const { cart } = useTypedSelector(state => state.user);

  console.log(cart.id);

  const server = useServerApi();

  const draft: MyCartDraft = {
    currency: 'USD',
  };
  const productQuantity = 1;
  const productVariant = 1;


  // const name = product.name.en.split(/.-./);

  //const [ addInCart, setAddInCart ] = useState<boolean>(false);


  const handleClick = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    
    e.preventDefault();
    //setAddInCart(!addInCart);
    e.stopPropagation();

    if (!cart.id) {

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
        cart.id,
        cart.version,
        productVariant,
        productQuantity,
        product.id
      );
    
    }
  
  };


  // const cartIconDisabled = addInCart ? 'disabled' : '';

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