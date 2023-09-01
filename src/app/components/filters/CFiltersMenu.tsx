import useMultiRange from '../../services/input/useMultiRange';
import CButton from '../button/CButton';
import CRange from '../inputs/range/CRange';

import './CFiltersMenu.css';

const CFilterMenu = ({ callback }: { callback: Function } ) => {
  
  const multiRange = useMultiRange('0', '100');

  return (
    <div className="filter_menu">
      <CRange {...multiRange}/>
      <CButton 
        type="submit" 
        value="Submit" 
        clickHandler={() => callback({

          minPrice: multiRange.minRange,
          maxPrice: multiRange.maxRange
      
        })}
      />
    </div>
  );

};

export default CFilterMenu;