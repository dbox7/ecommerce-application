import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { apiAnonRoot } from '../../ctp';
import { useState } from 'react';

import { CProductCard } from '../../components/products/card/CProductCard';

import './CatalogPage.css';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';

export function CatalogPage() {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [products, setProducts] = useState<ProductProjection[]>([]);


  useEffect(() => {

    let api;

    if (globalStore.currentUser.id) {

      api = globalStore.apiMeRoot;

    } else {

      api = apiAnonRoot;

    }

    api?.productProjections().get().execute().then(data => {

      const products = data.body.results;

      setProducts(products);

    }
    );

  }, []);



  return (
    <div className="catalog">
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