import { useState, useContext } from 'react';
import { useApi } from './useApi';
import { CustomerUpdate } from '@commercetools/platform-sdk';
import { GlobalContext } from '../store/GlobalContext';
import { IAction, IAddress, IToastify, IUpdateUserAddresses } from '../utils/types';
import useToastify from './useToastify';


const useUpdateAddresses = (): IUpdateUserAddresses => {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [error, setError] = useState<string>('');
  const api = useApi();
  const notify = useToastify();
  const errorMessage: IToastify = {
    error: 'An error occurred while updating address.',
  };
  const successMessage: IToastify = {
    success: 'Your addresses has been updated successfully!'
  };

  const addAddresses = (
    customerID: string,
    version: number,
    address: IAddress,
    actionType: string,
  ): void => {


 
    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'addAddress', address }
      ]
    };


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });

        const addresses = data.body.addresses;
        const lastAddress = addresses[addresses.length - 1];
        const addressId = lastAddress.id;
        const version = data.body.version;

        const actions: { action: IAction; [key: string]: string }[] = [];
        
        const createAction = (action: IAction, params: Record<string, string>): void => {

          actions.push({ action, ...params });
        
        };

        if (addressId) {

          switch (actionType) {

          case 'addBillingAddressId':
            createAction('addBillingAddressId', { addressId });
            break;
          case 'addShippingAddressId':
            createAction('addShippingAddressId', { addressId });
            break;
          default:
            break;

          }
        
        }

        const updateData = {
          version,
          actions,
        };

        api.customers()
          .withId({ ID: customerID })
          .post({ body: updateData as CustomerUpdate})
          .execute()
          .then((data) => {

            setGlobalStore({ ...globalStore, currentUser: data.body });
      
          })
          .catch((error) => {

            setError('An error occurred while updating address.');
        
          });
      
      })
      .catch((error) => {

        setError('An error occurred while updating address.');
        notify(errorMessage);

      });
    
  
  };

  const changeAddress = (
    customerID: string,
    version: number,
    address: IAddress,
    addressId: string,
    actionTypes: string[],
  ): void => {

    const actions: { action: IAction; [key: string]: string | IAddress }[] = [];

    for (let i = 0; i < actionTypes.length; i+=1) {

      const actionType = actionTypes[i];
  
      switch (actionType) {

      case 'changeAddress':
        actions.push({ action: actionType, addressId, address });
        break;
      case 'addShippingAddressId':
        actions.push({ action: actionType, addressId });
        break;
      case 'addBillingAddressId':
        actions.push({ action: actionType, addressId });
        break;
      case 'setDefaultBillingAddress':
        actions.push({ action: actionType, addressId });
        break;
      case 'setDefaultShippingAddress':
        actions.push({ action: actionType, addressId });
        break;
      default:
        break;
      
      }
    
    }
  
    const updateData = {
      version,
      actions,
    };
  


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData as CustomerUpdate })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });
        notify(successMessage);
      
      })
      .catch((error) => {

        setError('An error occurred while updating address.');
        notify(errorMessage);
        
      });
    
  
  };

  const removeAddress = (
    customerID: string,
    version: number,
    addressId: string,
  ): void => {


 
    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'removeAddress', addressId }
      ]
    };


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });
        notify(successMessage);
      
      })
      .catch((error) => {

        setError('An error occurred while updating address.');
        notify(errorMessage);
        
      });
    
  
  };

  const setDefaultAddress = (
    customerID: string,
    version: number,
    addressId: string,
    actionType: string,
  ): void => {

    const actions: { action: IAction; [key: string]: string }[] = [];

    const createAction = (action: IAction, params: Record<string, string>): void => {

      actions.push({ action, ...params });
    
    };

    switch (actionType) {

    case 'setDefaultShippingAddress':
      createAction('setDefaultShippingAddress', { addressId });
      break;
    case 'setDefaultBillingAddress':
      createAction('setDefaultBillingAddress', { addressId });
      break;
    default:
      break;
    
    }
 
    const updateData = {
      version,
      actions,
    };


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData as CustomerUpdate })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });
        notify(successMessage);
      
      })
      .catch((error) => {

        setError('An error occurred while updating address.');
        notify(errorMessage);
        
      });
    
  
  };

  return { addAddresses, changeAddress, removeAddress, setDefaultAddress,  error };

};

export default useUpdateAddresses;