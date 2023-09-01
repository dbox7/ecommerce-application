import CRange from '../../components/inputs/range/CRange';
import useMultiRange from '../../services/input/useMultiRange';

import './CartPage.css';

export const CartPage = () => {

  const multiRange = useMultiRange('0', '100');

  return (
    
    <div className="cart-poster-wrap">
      <CRange {...multiRange} />
    </div>
  );

};