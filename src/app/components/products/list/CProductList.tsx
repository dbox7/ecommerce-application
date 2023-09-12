import { useEffect, memo } from 'react';
import { IProductListProps, IQueryArgs } from '../../../utils/types';
import { useServerApi } from '../../../services/useServerApi';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';

import { Link } from 'react-router-dom';
import { CProductCard } from '../card/CProductCard';

import './CProductList.css';


const concatQueryString = (attr: string, attrArray: string[]) => {
  
  let res = `variants.attributes.${attr}:`;

  attrArray.forEach((attr: string) => {
    
    res += `"${attr}",`;
  
  });

  return res.slice(0, -1);

};

export const CProductList = memo(({ filters }: IProductListProps) => {

  const server = useServerApi();
  const { products } = useTypedSelector(state => state.products);

  useEffect(() => {

    let queryArgs: IQueryArgs = {
      limit: 30,
      filter: [], 
    };

    if (filters.search) {

      queryArgs['text.en'] = filters.search;

    }
    
    if ( filters.categoryId !== undefined ) {

      queryArgs.filter!.push(`categories.id:"${filters.categoryId}"`);
    
    }

    if ( filters.minPrice !== undefined || filters.maxPrice !== undefined) {

      queryArgs.filter!.push(`variants.price.centAmount:range (${filters.minPrice! * 100} to ${filters.maxPrice! * 100})`);
    
    }
    
    if ( filters.sizes && filters.sizes.length !== 0 ) {

      const res = concatQueryString('size', filters.sizes);

      queryArgs.filter!.push(res);

    }

    if (filters.brands && filters.brands.length !== 0) {

      const res = concatQueryString('Brand.key', filters.brands);

      queryArgs.filter!.push(res);
    
    }

    queryArgs.sort = filters.sort;

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