import { Link } from 'react-router-dom';

import CButton from '../../components/button/CButton';

import { BsPlus } from 'react-icons/bs';
import { BsDash } from 'react-icons/bs';
import { GoTrash } from 'react-icons/go';

import './CartPage.css';

export const CartPage = () => {

  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>
      <div className="cart__content">
        <div className="cart__content__products-container">
          {/* сюда вставить проверку на наличие товаров в корзине и показывать элемент, если пустая */
            /* <div className="cart__content__products-container__empty">
                <p>Your cart is currently empty.<br/>Take a look at the 
                  <Link to="/catalog"><b>Catalog</b></Link>, 
                  there are many cool products there.
                </p>
              </div>
          */}
          <div className="cart__content__products-container__product">
            <div className="cart__content__products-container__product__image">
              <Link to="/product/1"><img src="https://via.placeholder.com/80x80" alt="Product" />
                {/* сюда вставить изображение товара (первый элемент из массива картинок) и ссылку на страницу товара */}  
              </Link>
            </div>
            <div className="cart__content__products-container__product__name">
              <Link to="/product/1">
                <b>Product 1</b>
                {/* сюда вставить имя товара и ссылку на страницу товара */}              
              </Link>
            </div>
            <div className="cart__content__products-container__product__count">
              <BsDash className="cart__content__products-container__product__count__minus">
                {/* сюда вставить функцию уменьшения количества товара в корзине */}
              </BsDash>
              <div className="cart__content__products-container__product__count__number">
                1
                {/* сюда вставить переменную количества этого товара */}    
              </div>
              <BsPlus className="cart__content__products-container__product__count__plus">
                {/* сюда вставить функцию увеличения количества товара в корзине */}
              </BsPlus>
            </div>
            <div className="cart__content__products-container__product__price">600$</div>
            <GoTrash className="cart__content__products-container__product__delete">
              {/* сюда вставить функцию удаления товара из корзины */}
            </GoTrash>
          </div>
          <div className="cart__content__products-container__product">
            <div className="cart__content__products-container__product__image">
              <Link to="/product/1"><img src="https://via.placeholder.com/80x80" alt="Product" />
                {/* сюда вставить изображение товара (первый элемент из массива картинок) и ссылку на страницу товара */}  
              </Link>
            </div>
            <div className="cart__content__products-container__product__name">
              <Link to="/product/1">
                <b>Product 1</b>
                {/* сюда вставить имя товара и ссылку на страницу товара */}              
              </Link>
            </div>
            <div className="cart__content__products-container__product__count">
              <BsDash className="cart__content__products-container__product__count__minus">
                {/* сюда вставить функцию уменьшения количества товара в корзине */}
              </BsDash>
              <div className="cart__content__products-container__product__count__number">
                1
                {/* сюда вставить переменную количества этого товара */}    
              </div>
              <BsPlus className="cart__content__products-container__product__count__plus">
                {/* сюда вставить функцию увеличения количества товара в корзине */}
              </BsPlus>
            </div>
            <div className="cart__content__products-container__product__price">600$</div>
            <GoTrash className="cart__content__products-container__product__delete">
              {/* сюда вставить функцию удаления товара из корзины */}
            </GoTrash>
          </div>
          <div className="cart__content__products-container__product">
            <div className="cart__content__products-container__product__image">
              <Link to="/product/1"><img src="https://via.placeholder.com/80x80" alt="Product" />
                {/* сюда вставить изображение товара (первый элемент из массива картинок) и ссылку на страницу товара */}  
              </Link>
            </div>
            <div className="cart__content__products-container__product__name">
              <Link to="/product/1">
                <b>Product 1</b>
                {/* сюда вставить имя товара и ссылку на страницу товара */}              
              </Link>
            </div>
            <div className="cart__content__products-container__product__count">
              <BsDash className="cart__content__products-container__product__count__minus">
                {/* сюда вставить функцию уменьшения количества товара в корзине */}
              </BsDash>
              <div className="cart__content__products-container__product__count__number">
                1
                {/* сюда вставить переменную количества этого товара */}    
              </div>
              <BsPlus className="cart__content__products-container__product__count__plus">
                {/* сюда вставить функцию увеличения количества товара в корзине */}
              </BsPlus>
            </div>
            <div className="cart__content__products-container__product__price">600$</div>
            <GoTrash className="cart__content__products-container__product__delete">
              {/* сюда вставить функцию удаления товара из корзины */}
            </GoTrash>
          </div>
          <div className="cart__content__products-container__product">
            <div className="cart__content__products-container__product__image">
              <Link to="/product/1"><img src="https://via.placeholder.com/80x80" alt="Product" />
                {/* сюда вставить изображение товара (первый элемент из массива картинок) и ссылку на страницу товара */}  
              </Link>
            </div>
            <div className="cart__content__products-container__product__name">
              <Link to="/product/1">
                <b>Product 1</b>
                {/* сюда вставить имя товара и ссылку на страницу товара */}              
              </Link>
            </div>
            <div className="cart__content__products-container__product__count">
              <BsDash className="cart__content__products-container__product__count__minus">
                {/* сюда вставить функцию уменьшения количества товара в корзине */}
              </BsDash>
              <div className="cart__content__products-container__product__count__number">
                1
                {/* сюда вставить переменную количества этого товара */}    
              </div>
              <BsPlus className="cart__content__products-container__product__count__plus">
                {/* сюда вставить функцию увеличения количества товара в корзине */}
              </BsPlus>
            </div>
            <div className="cart__content__products-container__product__price">600$</div>
            <GoTrash className="cart__content__products-container__product__delete">
              {/* сюда вставить функцию удаления товара из корзины */}
            </GoTrash>
          </div>
          <div className="cart__content__products-container__product">
            <div className="cart__content__products-container__product__image">
              <Link to="/product/1"><img src="https://via.placeholder.com/80x80" alt="Product" />
                {/* сюда вставить изображение товара (первый элемент из массива картинок) и ссылку на страницу товара */}  
              </Link>
            </div>
            <div className="cart__content__products-container__product__name">
              <Link to="/product/1">
                <b>Product 1</b>
                {/* сюда вставить имя товара и ссылку на страницу товара */}              
              </Link>
            </div>
            <div className="cart__content__products-container__product__count">
              <BsDash className="cart__content__products-container__product__count__minus">
                {/* сюда вставить функцию уменьшения количества товара в корзине */}
              </BsDash>
              <div className="cart__content__products-container__product__count__number">
                1
                {/* сюда вставить переменную количества этого товара */}    
              </div>
              <BsPlus className="cart__content__products-container__product__count__plus">
                {/* сюда вставить функцию увеличения количества товара в корзине */}
              </BsPlus>
            </div>
            <div className="cart__content__products-container__product__price">600$</div>
            <GoTrash className="cart__content__products-container__product__delete">
              {/* сюда вставить функцию удаления товара из корзины */}
            </GoTrash>
          </div>
        </div>
        <div className="cart__content__order-container__total">total price:
          {/* сюда переменную суммы */}
        </div>
        <div className="cart__content__order-container">
          <CButton value="clear cart" type="submit" extraClass="clear"></CButton>
          <CButton value="order!" type="submit" extraClass="order"></CButton>
        </div>
      </div>
    </div>
  );

};