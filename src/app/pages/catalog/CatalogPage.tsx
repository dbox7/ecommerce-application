import { useEffect } from 'react';
import { apiAnonRoot } from '../../ctp';
import { useState } from 'react'; 
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { useApi } from '../../services/useApi';

import { CSearchBar } from '../../components/products/search/CSearchBar';
import { CCategoriesList } from '../../components/products/categories/CCategoriesList';
import { IProductFilters } from '../../utils/types';
import { CFilterProducts } from '../../components/products/filters/CFilterProducts';
import { CProductList } from '../../components/products/list/CProductList';

import './CatalogPage.css';


export function CatalogPage() {

  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [filters, setFilters] = useState<IProductFilters>({});
  const [categories, setCategories] = useState<Category[]>([]);

  let api = useApi();

  const handleSearch = (query: string) => {

    const queryLower = query.toLowerCase();
    
    apiAnonRoot.productProjections().search().get({
      queryArgs: {
        'text.en': queryLower, 
        limit: 1
      }
    }).execute().then(data => {
        
      const products = data.body.results;

      setProducts(products);

    }).catch(error => {
        
      console.log(error);

    });
    

  };

  useEffect(() => {

    api?.productProjections().get({
      queryArgs: {
        limit: 100
      }
    }).execute().then(data => {

      const products = data.body.results;

      setProducts(products);

    }
    );

    api?.categories().get().execute().then((data) => {

      setCategories(data.body.results);

    });

  }, []);



  return (
    <div className="catalog">
      <CSearchBar onSearch={handleSearch}></CSearchBar>
      <div className="catalog-menu">
        <CFilterProducts filters={filters} setFilters={setFilters}/>
        <CCategoriesList categories={categories} filters={filters} setFilters={setFilters}/>
      </div>
      <CProductList filters={filters}/>
    </div>
  );


}