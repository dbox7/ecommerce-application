import { ALL_SIZES } from '../../utils/constants';

import './CSizeOption.css';

const CSizeOption = ({ sizes }: { sizes: number[] }) => {

  return ( 
    <div className="size-option">
      {
        ALL_SIZES.map((size, idx) => (
          sizes.includes(size) ?
            <div className="size" key={idx}>US {size}</div>
            :
            <div className="size disabled" key={idx}  >US {size}</div>
        ))
      }
    </div>
  );

};
 
export default CSizeOption;