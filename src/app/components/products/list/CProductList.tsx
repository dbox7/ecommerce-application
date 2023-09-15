import { useEffect, memo } from 'react';
import { IProductListProps } from '../../../utils/types';
import { useServerApi } from '../../../services/useServerApi';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { checkFilters } from '../../../utils/usefullFuncs';

import { Link } from 'react-router-dom';
import { CProductCard } from '../card/CProductCard';

import './CProductList.css';


export const CProductList = memo(({ filters }: IProductListProps) => {

  const server = useServerApi();
  const { products } = useTypedSelector(state => state.products);

  useEffect(() => {

    const queryArgs = checkFilters(filters);

    server.FilterProducts(queryArgs);
     
  }, [filters]);  


  return (
    <div className="product__wrap">
      <div className="product-list-title">Products ({products.length})</div>
      <div className="product-list">
        { products.map((product) => 
          <Link 
            key={ product.id } 
            to={`/catalog/${product.id}`} 
            className="product__link"
          > 
            <CProductCard product={ product }/> 
          </Link>
        )}
      </div>
    </div>
  );

});