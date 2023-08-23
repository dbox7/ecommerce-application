import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useApi } from '../../../services/useApi';
import { IProductListProps, IQueryArgs } from '../../../utils/types';
import { Link } from 'react-router-dom';

import { CProductCard } from '../card/CProductCard';

import './CProductList.css';


export function CProductList({ filters }: IProductListProps) {

  const [products, setProducts] = useState<ProductProjection[]>([]);

  const api = useApi();

  useEffect(() => {

    let queryArgs: IQueryArgs = {
      limit: 30,
      filter: []
    };

    if ( filters.categoryId !== undefined ) {

      queryArgs.filter = `categories.id:"${filters.categoryId}"`;
    
    }

    api.productProjections().search().get({
      queryArgs: queryArgs,
          
    }).execute().then((data) => {

      setProducts(data.body.results);
      
    });
    
     

  }, [filters]);



  return (
    <>
      <h3 className="product-list-title">Products ({products.length})</h3>
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