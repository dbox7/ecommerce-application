import { IAdressProps } from '../../utils/types';

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
        {addresses.map(address => (
          <li className="address-item"
            key={address.id}>
            <span>
              {address.id && shippingAddressIds.includes(address.id)
                ? 'Shipping'
                : address.id && billingAddressIds.includes(address.id)
                  ? 'Billing'
                  : 'Unknown'} Address
            </span>
            <span>
              {address.id && defaultShippingAddressIds && defaultShippingAddressIds.includes(address.id)
                ? 'Default'
                : address.id && defaultBillingAddressIds && defaultBillingAddressIds.includes(address.id)
                  ? 'Dufault'
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
        ))}
      </ul>
    </div>
  );

};

export default CUserAddresses;