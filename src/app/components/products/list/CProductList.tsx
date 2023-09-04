import { useState, useEffect, memo } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { IProductListProps, IQueryArgs } from '../../../utils/types';
import { useServerApi } from '../../../services/useServerApi';

import { Link } from 'react-router-dom';
import { CProductCard } from '../card/CProductCard';
import { CSortProducts } from '../sort/CSortProducts';

import './CProductList.css';
import { CLoading } from '../../loading/CLoading';

const concatQueryString = (attr: string, attrArray: string[]) => {

  let res = `variants.attributes.${attr}:`;

  attrArray.forEach((attr: string) => {
    
    res += `"${attr}",`;
  
  });

  return res.slice(0, -1);

};

export const CProductList = memo(({ filters, setFilters }: IProductListProps) => {

  const [products, setProducts] = useState<ProductProjection[]>([]);
  const server = useServerApi();

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

    if ( filters.sort === 'price' ) {
        
      queryArgs.sort = (filters.sort) + (filters.sortOrder ? ' asc' : ' desc');

    }

    if ( filters.sort === 'name' ) {
        
      queryArgs.sort = (filters.sort) + '.en' + (filters.sortOrder ? ' asc' : ' desc');

    }

    server.FilterProducts(queryArgs, setProducts);
     
  }, [filters]);  

  return (
    <div className="product__wrap">
      <div className="sort-container">
        <CSortProducts 
          type="name" 
          filters={filters} 
          setFilters={setFilters}
        />
        <div className="product-list-title">products ({products.length})</div>
        <CSortProducts 
          type="price" 
          filters={filters} 
          setFilters={setFilters}
        />
      </div>
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