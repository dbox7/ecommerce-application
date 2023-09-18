import { useServerApi } from '../../services/useServerApi';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { useState, FormEvent } from 'react';
import { useShowMessage } from '../../services/useShowMessage';
import { msg, DISCOUNTS } from '../../utils/constants';

import CButton from '../../components/button/CButton';
import { Link } from 'react-router-dom';
import CModal from '../../components/modal/CModal';

import { BsPlus } from 'react-icons/bs';
import { BsDash } from 'react-icons/bs';
import { GoTrash } from 'react-icons/go';

import './CartPage.css';


export const CartPage = () => {

  const { cart } = useTypedSelector(state => state.cart);
  const [discount, setDiscount] = useState('');

  const server = useServerApi();
  const showMessage = useShowMessage();

  const [modalState, setModalState] = useState(false);
  const [plusButtonActive, setPlusButtonActive] = useState(true);
  const [minusButtonActive, setMinusButtonActive] = useState(true);
  const [isOrdered, setOrdered] = useState(false);

  const handleDeleteItem = async (e: React.MouseEvent<SVGElement, MouseEvent>, itemId: string, quantity: number) => {
    
    e.preventDefault();

    if (cart) {

      const res = await server.removeCartItem(cart.id, cart.version, quantity, itemId);

      if (res === 'error') {

        showMessage(msg.COMMON_ERROR);

      }
    
    }

  };

  const handleClearCart = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    
    e.preventDefault();
    if (cart.lineItems.length === 0) {
        
      showMessage(msg.CLEAR_EMPTY_CART);
      return;

    }

    if (cart) {

      const res = await server.deleteCart(cart.id, cart.version);

      if (res === 'error') {

        showMessage(msg.COMMON_ERROR);

      }
    
    }

    setModalState(false);

  };

  const handleDiscount = async (e: FormEvent) => {

    e.preventDefault();
    const discountId = DISCOUNTS[discount];

    if (discount === '') {
        
      showMessage(msg.DISCOUNT_INPUT_EMPTY);
      return;

    }

    if (cart.lineItems.length === 0) {
        
      showMessage(msg.DISCOUNT_CART_EMPTY);
      return;
  
    }
    
    if(cart.discountCodes.find((item) => item.discountCode.id === discountId) !== undefined) {

      showMessage(msg.DISCOUNT_ALREADY_EXIST);
      return;
      
    };
 
    const res = await server.addDiscount(cart.id, cart.version, discount);

    if (res === 'error') {

      showMessage(msg.COMMON_ERROR);

    } else {
        
      showMessage(msg.DISCOUNT_ADD_SUCCESS);

    }

    setDiscount('');

  };

  const handlePlusItem = async (e: React.MouseEvent<SVGElement, MouseEvent>, itemId: string, quantity: number) => {
    
    e.preventDefault();
    if (!plusButtonActive) {

      return;
    
    }

    if (cart) {

      setPlusButtonActive(false);

      const res = await server.changeLineItem(cart.id, cart.version, quantity + 1, itemId);

      if (res === 'error') {
       
        showMessage(msg.COMMON_ERROR);

      }
    
    }

    setPlusButtonActive(true);
  
  };

  const handleMinusItem = async (e: React.MouseEvent<SVGElement, MouseEvent>, itemId: string, quantity: number) => {
    
    e.preventDefault();

    if (!minusButtonActive) {

      return;
    
    }

    if (cart) {

      setMinusButtonActive(false);

      const res = await server.changeLineItem(cart.id, cart.version, quantity - 1, itemId);

      if (res === 'error') {
       
        showMessage(msg.COMMON_ERROR);

      }
    
    }
    setMinusButtonActive(true);

  };

  const handleOrder = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {

    if (cart.lineItems.length === 0) {
          
      showMessage(msg.ORDER_CART_EMPTY);
      return;
  
    }

    showMessage(msg.ORDER_CREATE_SUCCESS);
    setOrdered(true);
    handleClearCart(e);

  };

  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>
      <div className="cart__content">
        <div className="cart__content__products-container">
          {isOrdered ?
            (<div className="cart__content__products-container__empty">
              <p>
                Your order has been accepted!<br/>When we open our real store, we will get in touch with you.<br/>Perhaps.
              </p>
            </div>)
            : 
            !isOrdered && !cart || !cart.lineItems || cart.lineItems.length === 0 ?  
              (<div className="cart__content__products-container__empty">
                <p>
                  Your cart is currently empty. Take a look at the{' '}
                  <Link to="/catalog" className="cart__content__products-container__empt__link">
                    <b>Catalog</b>
                  </Link>
                  , there are many cool products there.
                </p>
              </div>)
              :
              (cart.lineItems.map((lineItem) => (
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
                      {lineItem.name.en}
                    </Link>
                  </div>
                  <div className="cart__content__products-container__product__count">
                    <BsDash className={`cart__content__products-container__product__count__minus ${minusButtonActive ? '' : 'disabled'}`} 
                      onClick={(e) => handleMinusItem(e, lineItem.id, lineItem.quantity)}/>
                    <div className="cart__content__products-container__product__count__number">
                      {lineItem.quantity}
                    </div>
                    <BsPlus className={`cart__content__products-container__product__count__plus ${plusButtonActive ? '' : 'disabled'}`} 
                      onClick={(e) => handlePlusItem(e, lineItem.id, lineItem.quantity)}/>
                  </div>
                  <div className="cart__content__products-container__product__price">
                    <p>price</p>
                    {lineItem.price.discounted ? lineItem.price.discounted.value.centAmount/100 : lineItem.price.value.centAmount/100}$
                  </div>
                  <div className="cart__content__products-container__product__price subtotal">
                    <p>subtotal</p>
                    {lineItem.discountedPricePerQuantity.length > 0 ?
                      (<div className="cart__content__products-container__product__price__total__old_new">
                        <span className="cart__content__products-container__product__price__total__old">{lineItem.price.discounted ?
                          lineItem.price.discounted.value.centAmount/100 * lineItem.quantity
                          : lineItem.price.value.centAmount/100 * lineItem.quantity}$</span>
                        <span>{lineItem.totalPrice.centAmount/100}$</span>
                      </div>) : (<span>{lineItem.totalPrice.centAmount/100}$</span>)}
                  </div>
                  <GoTrash className="cart__content__products-container__product__delete"
                    onClick={(e) => handleDeleteItem(e, lineItem.id, lineItem.quantity)}/>
                </div>
              ))
              )
          }
        </div>
        <div className="cart__content__order-container__discount">
          <form onSubmit={handleDiscount}>
            <label>Do you have a promo code?
              <input 
                type="text" 
                placeholder="Enter it here"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}/>
            </label>
            <button 
              className="cart__content__order-container__discount__button" 
              type="submit"
              onClick={handleDiscount}>Yes!
            </button>
          </form>
        </div>
        <div className="cart__content__order-container__total">
          total order price: {cart.id ? `${cart.totalPrice.centAmount / 100}$` : '0'}
        </div>
        <div className="cart__content__order-container">
          <CButton value="Clear cart" type="submit" extraClass="clear" clickHandler={() => setModalState(!modalState)}></CButton>
          <CModal
            isActive={modalState}
            setIsActive={setModalState}>
            <div className="title">Clear cart
              <p>You really want to clear the cart ?
              </p>
            </div>
            <div className="btn-block">
              <CButton
                value="Yes"
                type="button"
                disabled={false}
                clickHandler={handleClearCart}
              />
              <CButton
                value="Cancel"
                type="button"
                disabled={false}
                clickHandler={() => setModalState(false)}
              />
            </div>
          </CModal>
          <CButton 
            value="Order!" 
            type="submit" 
            extraClass="order"
            clickHandler={handleOrder}
          />
        </div>
      </div>
    </div>
  );

};

