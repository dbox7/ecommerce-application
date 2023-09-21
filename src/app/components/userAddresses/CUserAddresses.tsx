import { useState, FC } from 'react';
import { IAddress } from '../../utils/types';
import { useServerApi } from '../../services/useServerApi';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { useShowMessage } from '../../services/useShowMessage';
import { msg } from '../../utils/constants';

import CButton from '../button/CButton';
import CModal from '../modal/CModal';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CEditAddressForm from '../changeAddressForm/CEditAddressForm';
import CAddAddressForm from '../addAddressForm/CAddAddressForm';

import './CUserAddresses.css';

interface IAdressProps {
  addresses: IAddress[]
  shippingAddressIds: string[]
  billingAddressIds: string[]
  defaultBillingAddressIds: string | undefined
  defaultShippingAddressIds: string | undefined
}

const CUserAddresses: FC<IAdressProps> = ({ 
  addresses,
  shippingAddressIds,
  billingAddressIds,
  defaultShippingAddressIds,
  defaultBillingAddressIds
}) => {

  const server = useServerApi();
  const showMessage = useShowMessage();
  const {currentUser} = useTypedSelector(state => state.user);

  const [modalAddAddress, setModalAddAddress] = useState(false);
  const [modalRemoveAddress, setModalRemoveAddress] = useState<Record<string, boolean>>({});
  const [modalSetDefault, setModalSetDefault] = useState<Record<string, boolean>>({});

  const [useDefaultShippingAddress, setUseDefaultShippingAddress] = useState<Record<string, boolean>>({});
  const [useDefaultBillingAddress, setUseDefaultBillingAddress] = useState<Record<string, boolean>>({});
  const [modalEditAddress, setModalEditAddress] = useState<Record<string, boolean>>({});

  return (
    <div>
      <h3>User Addresses</h3>
      <ul className="address-list">
        {addresses.map(address => {

          const isShippingAddress = address.id && shippingAddressIds.includes(address.id);
          const isBillingAddress = address.id && billingAddressIds.includes(address.id);
          const isDefaultShipping = address.id && defaultShippingAddressIds && defaultShippingAddressIds.includes(address.id);
          const isDefaultBilling = address.id && defaultBillingAddressIds && defaultBillingAddressIds.includes(address.id);

          const modalKey = `remove_${address.id}`;
          const modalState: boolean = modalRemoveAddress[modalKey] || false;
          const modalKeySetDefault = `setDafault_${address.id}`;
          const modalStateDefault: boolean = modalSetDefault[modalKeySetDefault] || false;
          const modalStateUseDefaultShipping: boolean = useDefaultShippingAddress[modalKeySetDefault] || false;
          const modalStateUseDefaultBilling: boolean = useDefaultBillingAddress[modalKeySetDefault] || false;
          const modalKeyEditAddress = `edit_${address.id}`;
          const modalStateEditAddress: boolean = modalEditAddress[modalKeyEditAddress] || false;


          const setModalState = (isActive: boolean) => {

            setModalRemoveAddress(prevStates => ({
              ...prevStates,
              [modalKey]: isActive,
            }));
          
          };

          const setModalStateDefault = (isActive: boolean) => {

            setModalSetDefault(prevStates => ({
              ...prevStates,
              [modalKeySetDefault]: isActive,
            }));
          
          };

          
          const setModalStateDefaultUseShipping = (isActive: boolean) => {

            setUseDefaultShippingAddress(prevStates => ({
              ...prevStates,
              [modalKeySetDefault]: isActive,
            }));
          
          };

                    
          const setModalStateDefaultUseBilling = (isActive: boolean) => {

            setUseDefaultBillingAddress(prevStates => ({
              ...prevStates,
              [modalKeySetDefault]: isActive,
            }));
          
          };

          const setModalStateEditAddress = (isActive: boolean) => {

            setModalEditAddress(prevStates => ({
              ...prevStates,
              [modalKeyEditAddress]: isActive,
            }));
          
          };

          const handleDeleteAddressClick = async () => {

            if(address.id) {

              const res = await server.removeAddress(
                currentUser.id,
                currentUser.version,
                address.id
              );

              res === 'success' ?
                showMessage(msg.ADDRESS_UPDATE_SUCCESS)
                :
                showMessage(msg.ADDRESS_UPDATE_ERROR);

            }
            setModalState(false);
  
          };


          const handleSetDefaultClick = async () => {

            let actionTypes: string[] = [];

            if (modalStateUseDefaultShipping && modalStateUseDefaultBilling) {
        
              actionTypes = ['setDefaultShippingAddress', 'setDefaultBillingAddress'];
            
            } else if (modalStateUseDefaultShipping) {
        
              actionTypes = ['setDefaultShippingAddress'];
            
            } else if (modalStateUseDefaultBilling) {
        
              actionTypes = ['setDefaultBillingAddress'];
            
            }

            if(address.id) {

              const res = await server.setDefaultAddress(
                currentUser.id,
                currentUser.version,
                address.id,
                actionTypes
              );

              res === 'success' ?
                showMessage(msg.ADDRESS_UPDATE_SUCCESS)
                :
                showMessage(msg.ADDRESS_UPDATE_ERROR);

            }
            setModalStateDefault(false);
            setModalStateDefaultUseBilling(false);
            setModalStateDefaultUseShipping(false);
  
          };

          return (
            <li className="address-item" key={address.id}>
              <div className="span-container">
                <div className="left-side">
                  <span>
                    {isShippingAddress ? 'Shipping Address' : isBillingAddress ? 'Billing Address' : ' '} 
                  </span>
                  <span>
                    {isBillingAddress && isShippingAddress ? 'Billing  Address' : ''}
                  </span>
                </div>
                <div className="right-side">
                  <span>
                    {isDefaultShipping
                      ? 'Default'
                      : isDefaultBilling
                        ? 'Default'
                        : ''}
                  </span>
                  <span>
                    {isDefaultShipping && isDefaultBilling
                      ? 'Default'
                      : ''}
                  </span>
                </div>
              </div>
              <div className="param">
                <div className="param-value">Street:</div>
                <div className="param-title">{address.streetName}</div>
                <div className="param-value">Postal Code:</div>
                <div className="param-title">{address.postalCode}</div>
                <div className="param-value">City:</div>
                <div className="param-title">{address.city}</div>
                <div className="param-value">Country:</div>
                <div className="param-title">{address.country}</div>
              </div>
              <ul className="action-list">
                <li
                  onClick={() => setModalStateEditAddress(!modalStateEditAddress)}
                >Edit
                  <CModal
                    isActive={modalStateEditAddress}
                    setIsActive={setModalStateEditAddress}
                  >
                    <CEditAddressForm
                      setModal={setModalStateEditAddress}
                      addressId={address.id}
                    ></CEditAddressForm>
                  </CModal>
                </li>
                <li
                  onClick={() => setModalState(!modalState)}>
                  Delete
                  <CModal
                    isActive={modalState}
                    setIsActive={setModalState}>
                    <div className="title">Delete address
                      <p>You really want to delete the address
                        <b>{' ' + address.streetName + ', ' + address.streetName + ', ' + address.city + ', ' + address.country + ' '}</b>
                        ?
                      </p>
                    </div>
                    <div className="btn-block">
                      <CButton
                        value="Yes"
                        type="button"
                        disabled={false}
                        clickHandler={handleDeleteAddressClick}
                      />
                      <CButton
                        value="Cancel"
                        type="button"
                        disabled={false}
                        clickHandler={() => setModalState(false)}
                      />
                    </div>
                  </CModal>
                </li>
                <li onClick={() => setModalStateDefault(!modalStateDefault)}>
                  Set as
                  <CModal
                    isActive={modalStateDefault}
                    setIsActive={setModalStateDefault}>
                    <div className="title">Confirm the action
                      <p>Select the address
                        <b>{' ' + address.streetName + ', ' + address.streetName + ', ' + address.city + ', ' + address.country + ' '}</b>
                        ?
                      </p>
                      <div>
                        <div>
                          <CCheckbox
                            title="Default billing address"
                            checked={modalStateUseDefaultBilling}
                            changeHandler={(e) => setModalStateDefaultUseBilling((e.target as HTMLInputElement).checked)}
                          />
                          <CCheckbox
                            title="Default shipping address"
                            checked={modalStateUseDefaultShipping}
                            changeHandler={(e) => setModalStateDefaultUseShipping((e.target as HTMLInputElement).checked)}
                          />
                          <div className="btn-block">
                            <CButton
                              value="Confirm"
                              type="button"
                              disabled={false}
                              clickHandler={handleSetDefaultClick}
                            />
                            <CButton
                              value="Cancel"
                              type="button"
                              disabled={false}
                              clickHandler={() => setModalStateDefault(false)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CModal>
                </li>
              </ul>
            </li>
          );
        
        })}
      </ul>
      <CModal
        isActive={modalAddAddress}
        setIsActive={setModalAddAddress}>
        <CAddAddressForm
          setModal={setModalAddAddress}/>
      </CModal>
      <CButton
        value="Add address"
        type="submit"
        disabled={false}
        clickHandler={() => setModalAddAddress(true)}
      />
    </div>
  );

};

export default CUserAddresses;