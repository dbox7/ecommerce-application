import CRange from '../../components/inputs/range/CRange';
import './CartPage.css';

export const CartPage = () => {

  return (
    
    <div className="cart-poster-wrap">
      <CRange min={1} max={100} />
    </div>
  );

};