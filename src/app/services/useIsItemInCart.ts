import { useEffect, useContext } from 'react';
import { GlobalContext } from '../store/GlobalContext';
import { useServerApi } from './useServerApi';

const useIsItemInCart = (productId: string | undefined): boolean => {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);

  const server = useServerApi();  
  
  useEffect(() => {

    if (globalStore.cart.id) {

      server.getCart(globalStore.cart.id)
        .then((cartData) => {

          setGlobalStore({ ...globalStore, cart: cartData });
        
        })
        .catch((error) => {

          console.error('Error fetching cart data:', error);
        
        });
    
    }
  
  }, []);


  return globalStore.cart.lineItems.some((item) => item.productId === productId);

};

export default useIsItemInCart;