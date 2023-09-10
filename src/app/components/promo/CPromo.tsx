import './CPromo.css';

export const CPromo = () => {
  
  return (
    <div className="promo-container">
      <div className="promo-content">
        <div className="promo-text">
          <div className="promo-text-left">
            <h2>STARTED<br/>RUNNING<br/>WITH US</h2>
          </div>
          <div className="promo-text-right">
            <p>25% discount with a promo code</p>
            <p>only until the end of the month</p>
            <p className="promo-code"><b>SPRINT25</b></p>
          </div>
        </div>
      </div>
    </div>
  );
  
};