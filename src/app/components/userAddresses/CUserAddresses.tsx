import { useContext, useState } from 'react';
import { IAdressProps } from '../../utils/types';
import CButton from '../button/CButton';
import CModal from '../modal/CModal';
import CAddAddressForm from '../addAddressForm/CAddAddressForm';
import { useServerApi } from '../../services/useServerApi';
import { GlobalContext } from '../../store/GlobalContext';
import './CUserAddresses.css';


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
          const modalState: boolean = modalRemoveAddress[modalKey] || modalSetDefault[modalKey] || false;

          const setModalState = (isActive: boolean) => {

            setModalRemoveAddress(prevStates => ({
              ...prevStates,
              [modalKey]: isActive,
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

          return (
            <li className="address-item" key={address.id}>
              <span>
                {isShippingAddress ? 'Shipping' : isBillingAddress ? 'Billing' : 'Unknown'} Address
              </span>
              <span>
                {isBillingAddress && isShippingAddress ? 'Billing  Address' : ''}
              </span>
              <span>
                {isDefaultShipping
                  ? 'Default'
                  : isDefaultBilling
                    ? 'Default'
                    : ''}
              </span>
              <div className="param">
                <div className="param-value">Street:</div>
                <div className="param-title">{address.streetName}</div>
                <div className="param-value">Postal Code:</div>
                <div className="param-title">{address.streetName}</div>
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
                <li>Set as</li>
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