import { Link, useNavigate } from 'react-router-dom';

import CButton from '../../components/button/CButton';

import { BsPlus } from 'react-icons/bs';
import { BsDash } from 'react-icons/bs';
import { GoTrash } from 'react-icons/go';

import './CartPage.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { useServerApi } from '../../services/useServerApi';
import { Cart } from '@commercetools/platform-sdk';

export const CartPage = () => {

  const [globalStore] = useContext(GlobalContext);
  const server = useServerApi();
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartState, setCartState] = useState(false);

  useEffect(() => {

    const fetchCart = async () => {

      try {

        if (globalStore.cart.id) {

          setCartState(true);
        
        }
      
      } catch (error) {

        console.error('Error fetching cart data:', error);
      
      }
    
    };
  
    fetchCart();
  
  }, [globalStore.cart.id]);
  
  useEffect(() => {

    const fetchCartData = async () => {

      try {

        if (cartState) {
        
          const cartData = await server.getCart(globalStore.cart.id);

          setCart(cartData);
        
        }
      
      } catch (error) {

        console.error('Error fetching cart data:', error);
      
      }
    
    };
  
    fetchCartData();
  
  }, [cartState, globalStore.cart.id]);

  const handleDeleteItem = async (e: React.MouseEvent<SVGElement, MouseEvent>, itemId: string) => {
    
    e.preventDefault();

    try {

      await server.removeCartItem(globalStore.cart.id, globalStore.cart.version, 1, itemId);

      const updatedCart = await server.getCart(globalStore.cart.id);

      setCart(updatedCart);
    
    } catch (error) {

      console.error('Error deleting item:', error);
    
    }

  };

  const handleClearCart = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    
    e.preventDefault();

    try {

      await server.deleteCart(globalStore.cart.id, globalStore.cart.version);

      setCartState(false);

    } catch (error) {

      console.error('Error deleting item:', error);
    
    }

  };

  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>
      <div className="cart__content">
        <div className="cart__content__products-container">
          {!cart || !cart.lineItems || cart.lineItems.length === 0 || !cartState ? (
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
                  <Link to={`/product/${lineItem.productId}`}>
                    {lineItem.variant && lineItem.variant.images && lineItem.variant.images[0] && (
                      <img src={lineItem.variant.images[0].url} alt={lineItem.name.en} />
                    )}
                  </Link>
                </div>
                <div className="cart__content__products-container__product__name">
                  <Link to={`/product/${lineItem.productId}`}>
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
          total price: {cart ? `${cart.totalPrice.centAmount/100}$` : '0'}
        </div>
        <div className="cart__content__order-container">
          <CButton value="clear cart" type="submit" extraClass="clear" clickHandler={handleClearCart}></CButton>
          <CButton value="order!" type="submit" extraClass="order"></CButton>
        </div>
      </div>
    </div>
  );

};

