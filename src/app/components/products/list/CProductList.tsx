import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useApi } from '../../../services/useApi';
import { IProductListProps, IQueryArgs } from '../../../utils/types';
import { Link } from 'react-router-dom';

import { CProductCard } from '../card/CProductCard';

import './CProductList.css';
import { CSortProducts } from '../sort/CSortProducts';


export function CProductList({ filters, setFilters }: IProductListProps) {

  const [products, setProducts] = useState<ProductProjection[]>([]);
  const api = useApi();

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

    api.productProjections().search().get({
      queryArgs: queryArgs
    }).execute().then((data) => {

      setProducts(data.body.results);
      
    });
    
     

  }, [filters]);



  return (
    <>
      <div className="sort-container">
        <CSortProducts type="name" filters={filters} setFilters={setFilters}/>
        <div className="product-list-title">products ({products.length})</div>
        <CSortProducts type="price" filters={filters} setFilters={setFilters}/>
        <></>
      </div>
      <div className="product-list">
        { products.map((product) => 
          <Link key={ product.id } to={`/catalog/${product.id}`}> 
            <CProductCard product={ product }/> 
          </Link>
        )}
      </div>
    </>
  );

}