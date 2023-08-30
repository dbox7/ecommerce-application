import { ALL_SIZES } from '../../utils/constants';

import './CSizeOption.css';

const CSizeOption = ({ sizes }: { sizes: number[] }) => {

  return ( 
    <div className="size-option">
      {
        ALL_SIZES.map(size => (
          sizes.includes(size) ?
            <div className="size">US {size}</div>
            :
            <div className="size disabled">US {size}</div>
        ))
      }
    </div>
  );

};
 
export default CSizeOption;