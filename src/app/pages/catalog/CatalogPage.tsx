import { useEffect } from 'react';
import { useState } from 'react'; 
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { useApi } from '../../services/useApi';

import { CCategoriesList } from '../../components/products/categories/CCategoriesList';
import { IProductFilters } from '../../utils/types';
import { CFilterProducts } from '../../components/products/filters/CFilterProducts';
import { CProductList } from '../../components/products/list/CProductList';

import './CatalogPage.css';


export function CatalogPage() {

  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [filters, setFilters] = useState<IProductFilters>({
    sort: 'name',
    sortOrder: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<String[]>([]);

  console.log('filters', filters);

  const api = useApi();

  useEffect(() => {

    api?.productProjections().get({
      queryArgs: {
        limit: 100
      }
    }).execute().then(data => {

      const products = data.body.results;

      setProducts(products);

    }).catch(() => {
        
      setErrors([...errors, 'Something went wrong. Please try again later.']);

    });

    api?.categories().get().execute().then((data) => {

      setCategories(data.body.results);

    }).catch(() => {
        
      setErrors([...errors, 'Something went wrong. Please try again later.']);

    });

  }, []);



  return (
    <div className="catalog">
      <CFilterProducts filters={filters} setFilters={setFilters}/>
      <CCategoriesList categories={categories} filters={filters} setFilters={setFilters}/>
      <CProductList filters={filters} setFilters={setFilters}/>
    </div>
  );


}