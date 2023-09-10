import { useServerApi } from '../../services/useServerApi';
import { UserActionsType } from '../reducers/userReducer';
import { store } from '../store';

export const login = (email: string, password: string) => {

  return async () => {

    const server = useServerApi();

    try {

      store.dispatch({type: UserActionsType.LOGIN});
      
      const res = await server.Login(email, password);

      store.dispatch({type: UserActionsType.LOGIN_SUCCESS, payload: res.body});

    } catch (e) {

      let error;

      if (e === 'Customer account with the given credentials not found.') {

        error = 'The user does not exist or the email/password is incorrect.';

      } else {
            
        error = 'Something went wrong. Please try again later.';

      }

      store.dispatch({type: UserActionsType.LOGIN_ERROR, payload: error});
      
    }

  };

  

};