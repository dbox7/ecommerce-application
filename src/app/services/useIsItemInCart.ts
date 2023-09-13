import { useEffect } from 'react';
import { useServerApi } from './useServerApi';
import { useTypedSelector } from '../store/hooks/useTypedSelector';
import { UserActionsType } from '../store/reducers/userReducer';
import { useDispatch } from 'react-redux';

const useIsItemInCart = (productId: string | undefined): boolean => {

  const { cart } = useTypedSelector(state => state.user);

  console.log(cart);

  const server = useServerApi();
  const dispatch: any = useDispatch();
  
  useEffect(() => {

    if (cart.id) {

      server.getCart(cart.id)
        .then((cartData) => {

          dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { cart: cartData}});
        
        })
        .catch((error) => {

          console.error('Error fetching cart data:', error);
        
        });
    
    }
  
  }, []);


  return cart.lineItems.some((item) => item.productId === productId);

};

export default useIsItemInCart;

