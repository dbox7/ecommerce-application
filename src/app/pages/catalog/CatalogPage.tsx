import { useEffect, useState } from 'react';
import { useServerApi } from '../../services/useServerApi';
import { Category } from '@commercetools/platform-sdk';
import { IProductFilters } from '../../utils/types';

import { CCategoriesList } from '../../components/products/categories/CCategoriesList';
import { CFilterProducts } from '../../components/products/filters/CFilterProducts';
import { CProductList } from '../../components/products/list/CProductList';

import './CatalogPage.css';

export const CatalogPage = () => {

  const [filters, setFilters] = useState<IProductFilters>({
    sort: 'name',
    sortOrder: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  
  const server = useServerApi();

  useEffect(() => {

    server.GetAllCategories(setCategories);

  }, []);

  return (
    <div className="catalog">
      <CFilterProducts filters={filters} setFilters={setFilters}/>
      <CCategoriesList categories={categories} filters={filters} setFilters={setFilters}/>
      <CProductList filters={filters} setFilters={setFilters}/>
    </div>
  );

};