import { IAdressProps } from '../../utils/types';
import CButton from '../button/CButton';

const CUserAddresses: React.FC<IAdressProps> = ({ 
  addresses,
  shippingAddressIds,
  billingAddressIds,
  defaultShippingAddressIds,
  defaultBillingAddressIds
}) => {

  return (
    <div>
      <h3>User Addresses</h3>
      <ul className="address-list">
        {addresses.map(address => {

          const isShippingAddress = address.id && shippingAddressIds.includes(address.id);
          const isBillingAddress = address.id && billingAddressIds.includes(address.id);
          const isDefaultShipping = address.id && defaultShippingAddressIds && defaultShippingAddressIds.includes(address.id);
          const isDefaultBilling = address.id && defaultBillingAddressIds && defaultBillingAddressIds.includes(address.id);

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
                <div className="param-title">{address.postalCode}</div>
                <div className="param-value">City:</div>
                <div className="param-title">{address.city}</div>
                <div className="param-value">Country:</div>
                <div className="param-title">{address.country}</div>
              </div>
            </li>
          );
        
        })}
      </ul>
      <CButton
        value="Add address"
        type="submit"
        disabled={false}
      />
    </div>
  );

};

export default CUserAddresses;