import { Link } from 'react-router-dom';
import { ICrumbs } from '../../utils/types';

import { IoIosArrowForward } from 'react-icons/io';

import './CBreadcrumbs.css';

const CBreadcrumbs = ({ crumbs }: { crumbs: ICrumbs[] }) => {

  return (

    <div className="breadcrumbs">
      { crumbs.map((v: ICrumbs, idx: number) => {

        if (idx === 0) {

          return <Link to={v.url} key={v.name}>{v.name}</Link>;
        
        } else return (

          <div className="breadcrumbs__array_wrap" key={v.name}>
            <IoIosArrowForward className="breadcrumbs__array"/>
            <Link to={v.url} key={v.name}>{v.name}</Link>
          </div>

        );
      
      })}
    </div>

  );
  
};

export default CBreadcrumbs;