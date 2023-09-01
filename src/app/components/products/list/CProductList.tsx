import { useState, useEffect, memo } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { IProductListProps, IQueryArgs } from '../../../utils/types';
import { useServerApi } from '../../../services/useServerApi';

import { Link } from 'react-router-dom';
import { CProductCard } from '../card/CProductCard';
import { CSortProducts } from '../sort/CSortProducts';

import './CProductList.css';

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

      queryArgs.filter = `categories.id:"${filters.categoryId}"`;
    
    }

    if ( filters.sort === 'price' ) {
        
      queryArgs.sort = (filters.sort) + (filters.sortOrder ? ' asc' : ' desc');

    }

    if ( filters.sort === 'name' ) {
        
      queryArgs.sort = (filters.sort) + '.en' + (filters.sortOrder ? ' asc' : ' desc');

    }

    server.FilterProducts(queryArgs, setProducts);
     
  }, [filters]);

  console.log(`render ${CProductList.name}`);
  

  return (
    <>
      {/* <div className="sort-container">
        <CSortProducts type="name" filters={filters} setFilters={setFilters}/>
        <div className="product-list-title">products ({products.length})</div>
        <CSortProducts type="price" filters={filters} setFilters={setFilters}/>
      </div> */}
      <div className="product-list">
        { products.map((product) => 
          <Link key={ product.id } to={`/catalog/${product.id}`}> 
            <CProductCard product={ product }/> 
          </Link>
        )}
      </div>
    </>
  );

});