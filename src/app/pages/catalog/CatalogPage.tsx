import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { apiAnonRoot } from '../../ctp';
import { useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';

import { CProductCard } from '../../components/products/card/CProductCard';
import { CSearchBar } from '../../components/products/search/CSearchBar';
import { CFilterProducts } from '../../components/products/filters/CFilterProducts';

import './CatalogPage.css';


export function CatalogPage() {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  
  const handleSearch = (query: string) => {

    const queryLower = query.toLowerCase();

    console.log(queryLower);
    
    apiAnonRoot.productProjections().search().get({
      queryArgs: {
        'text.en': queryLower, 
        limit: 1
      }
    }).execute().then(data => {
        
      const products = data.body.results;

      console.log(products);
      setProducts(products);

    }).catch(error => {
        
      console.log(error);

    });
    

  };

  useEffect(() => {

    let api;

    if (globalStore.currentUser.id) {

      api = globalStore.apiMeRoot;

    } else {

      api = apiAnonRoot;

    }

    api?.productProjections().get({
      queryArgs: {
        limit: 25
      }
    }).execute().then(data => {

      const products = data.body.results;

      setProducts(products);

    }
    );

  }, []);



  return (
    <div className="catalog">
      <CSearchBar onSearch={handleSearch}></CSearchBar>
      <CFilterProducts></CFilterProducts>
      <div className="product-card-container">
        { products.map(product => (
          <Link key={product.id} to={`/catalog/${product.id}`}>
            <CProductCard product={product}></CProductCard>
          </Link>
        )) }
      </div>
    </div>
  );


}