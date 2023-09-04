
import { useLocation, Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ICrumbs } from '../../utils/types';

import { IoIosArrowForward } from 'react-icons/io';

import './CBreadcrumbs.css';




const CBreadcrumbs = ({ crumbs }: { crumbs: ICrumbs[] }) => {

  console.log('CRUMBS COMPONENT', crumbs);

  return (

    <>
      <div className="breadcrumbs">
        { crumbs.map((v: ICrumbs) => {

          if (v.url) {

            return <Link to={v.url}>{v.name}</Link>;
          
          } else {

            return <><IoIosArrowForward/><span>{v.name}</span></>;
          
          }
        
        }) }
      </div>
    </>
  );
    


};

export default CBreadcrumbs;