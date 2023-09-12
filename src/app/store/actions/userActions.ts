import { Dispatch } from 'redux';
import { useServerApi } from '../../services/useServerApi';
import { IUserAction, UserActionsType } from '../reducers/userReducer';
import { store } from '../store';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createUserApiClient, PROJECT_KEY } from '../../ctp';

export const login = (email: string, password: string) => {

  // return async (dispatch: Dispatch<IUserAction>) => {
    
  //   dispatch({type: UserActionsType.LOGIN});

  //   try {
      
  //     // const res = await server.Login(email, password);

  //     const ctpMeClient = createUserApiClient(email, password);
  //     const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});
      
      
  //     const res = await apiMeRoot.me().login().post({
  //       body: {email, password}
  //     })
  //       .execute();

  //     console.log(res);
      
  //     // dispatch({type: UserActionsType.LOGIN_SUCCESS, payload: { user: res.body.customer, api: apiMeRoot }});

  //   } catch (e) {

  //     let error;

  //     if (e === 'Customer account with the given credentials not found.') {

  //       error = 'The user does not exist or the email/password is incorrect.';

  //     } else {
            
  //       error = 'Something went wrong. Please try again later.';

  //     }

  //     dispatch({type: UserActionsType.LOGIN_ERROR, payload: error});
      
  //   }

  // };

  

};