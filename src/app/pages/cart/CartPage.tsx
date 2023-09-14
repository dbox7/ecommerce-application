import { Link } from 'react-router-dom';
import { useServerApi } from '../../services/useServerApi';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import CButton from '../../components/button/CButton';

import { BsPlus } from 'react-icons/bs';
import { BsDash } from 'react-icons/bs';
import { GoTrash } from 'react-icons/go';

import './CartPage.css';


export const CartPage = () => {

  const { cart } = useTypedSelector(state => state.cart);
  const server = useServerApi();

  const handleDeleteItem = (e: React.MouseEvent<SVGElement, MouseEvent>, itemId: string) => {
    
    e.preventDefault();

    if (cart) {

      server.removeCartItem(cart.id, cart.version, 1, itemId);
    
    }

  };

  const handleClearCart = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    
    e.preventDefault();

    if (cart) {

      server.deleteCart(cart.id, cart.version);
    
    }

  };

  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>
      <div className="cart__content">
        <div className="cart__content__products-container">
          {!cart || !cart.lineItems || cart.lineItems.length === 0 ? (
            <div className="cart__content__products-container__empty">
              <p>
                Your cart is currently empty. Take a look at the{' '}
                <Link to="/catalog">
                  <b>Catalog</b>
                </Link>
                , there are many cool products there.
              </p>
            </div>
          ) : (
            cart.lineItems.map((lineItem) => (
              <div key={lineItem.id} className="cart__content__products-container__product">
                <div className="cart__content__products-container__product__image">
                  <Link to={`/catalog/${lineItem.productId}`}>
                    {lineItem.variant && lineItem.variant.images && lineItem.variant.images[0] && (
                      <img src={lineItem.variant.images[0].url} alt={lineItem.name.en} />
                    )}
                  </Link>
                </div>
                <div className="cart__content__products-container__product__name">
                  <Link to={`/catalog/${lineItem.productId}`}>
                    <b>{lineItem.name.en}</b>
                  </Link>
                </div>
                <div className="cart__content__products-container__product__count">
                  <BsDash className="cart__content__products-container__product__count__minus" />
                  <div className="cart__content__products-container__product__count__number">
                    {lineItem.quantity}
                  </div>
                  <BsPlus className="cart__content__products-container__product__count__plus" />
                </div>
                <div className="cart__content__products-container__product__price">
                  {lineItem.totalPrice.centAmount/100}$
                </div>
                <GoTrash className="cart__content__products-container__product__delete" 
                  onClick={(e) => handleDeleteItem(e, lineItem.id)}/>
              </div>
            ))
          )}
        </div>
        <div className="cart__content__order-container__total">
          total price: {cart ? `${cart.totalPrice.centAmount / 100}$` : '0'}
        </div>
        <div className="cart__content__order-container">
          <CButton value="clear cart" type="submit" extraClass="clear" clickHandler={handleClearCart}></CButton>
          <CButton value="order!" type="submit" extraClass="order"></CButton>
        </div>
      </div>
    </div>
  );

};

