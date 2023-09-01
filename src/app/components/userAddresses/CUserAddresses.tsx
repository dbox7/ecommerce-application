import { useContext, useState } from 'react';
import { IAdressProps } from '../../utils/types';
import CButton from '../button/CButton';
import CModal from '../modal/CModal';
import CAddAddressForm from '../addAddressForm/CAddAddressForm';
import { useServerApi } from '../../services/useServerApi';
import { GlobalContext } from '../../store/GlobalContext';
import './CUserAddresses.css';
import CCheckbox from '../inputs/checkbox/CCheckbox';


const CUserAddresses: React.FC<IAdressProps> = ({ 
  addresses,
  shippingAddressIds,
  billingAddressIds,
  defaultShippingAddressIds,
  defaultBillingAddressIds
}) => {

  const [modalAddAddress, setModalAddAddress] = useState(false);
  const [modalRemoveAddress, setModalRemoveAddress] = useState<Record<string, boolean>>({});
  const [modalSetDefault, setModalSetDefault] = useState<Record<string, boolean>>({});
  const server = useServerApi();
  const [globalStore] = useContext(GlobalContext);
  const [useDefaultShippingAddress, setUseDefaultShippingAddress] = useState<Record<string, boolean>>({});
  const [useDefaultBillingAddress, setUseDefaultBillingAddress] = useState<Record<string, boolean>>({});

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

          const handleDeleteAddressClick = () => {

            if(address.id) {

              server.removeAddress(
                globalStore.currentUser.id,
                globalStore.currentUser.version,
                address.id
              );

            }
            setModalState(false);
  
          };


          const handleSetDefaultClick = () => {

            let actionTypes: string[] = [];

            if (modalStateUseDefaultShipping && modalStateUseDefaultBilling) {
        
              actionTypes = ['setDefaultShippingAddress', 'setDefaultBillingAddress'];
            
            } else if (modalStateUseDefaultShipping) {
        
              actionTypes = ['setDefaultShippingAddress'];
            
            } else if (modalStateUseDefaultBilling) {
        
              actionTypes = ['setDefaultBillingAddress'];
            
            }


            if(address.id) {

              server.setDefaultAddress(
                globalStore.currentUser.id,
                globalStore.currentUser.version,
                address.id,
                actionTypes
              );

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
                <li>Edit</li>
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
                        {isDefaultShipping && isShippingAddress && !isBillingAddress && (
                          <div className="sorry-message">
                            <p>Sorry, but this address is already selected by default</p>
                            <CButton
                              value="Ok"
                              type="button"
                              disabled={false}
                              clickHandler={() => setModalStateDefault(false)}
                            />
                          </div>
                        )}
                        {isDefaultBilling && isBillingAddress && !isShippingAddress && (
                          <div className="sorry-message">
                            <p>Sorry, but this address is already selected by default</p>
                            <CButton
                              value="Ok"
                              type="button"
                              disabled={false}
                              clickHandler={() => setModalStateDefault(false)}
                            />
                          </div>
                        )}
                        {isDefaultBilling && isBillingAddress && isDefaultShipping && isShippingAddress && (
                          <div className="sorry-message">
                            <p>Sorry, but this address is already selected by default</p>
                            <CButton
                              value="Ok"
                              type="button"
                              disabled={false}
                              clickHandler={() => setModalStateDefault(false)}
                            />
                          </div>
                        )}
                        {isBillingAddress && !isDefaultBilling && (
                          <div>
                            <CCheckbox
                              title="Default billing address"
                              checked={modalStateUseDefaultBilling}
                              changeHandler={(e) => setModalStateDefaultUseBilling((e.target as HTMLInputElement).checked)}
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
                        )}
                        {isShippingAddress && !isDefaultShipping && (
                          <div>
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
                        )}
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