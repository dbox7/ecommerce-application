import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useServerApi } from '../../services/useServerApi';
import { IProductFilters } from '../../utils/types';
import { Category } from '@commercetools/platform-sdk';

import { CCategoriesList } from '../../components/products/categories/CCategoriesList';
import CFilterProducts from '../../components/products/filters/CFilterProducts';
import { CProductList } from '../../components/products/list/CProductList';

import './CatalogPage.css';
import CFilterMenu from '../../components/filters/CFiltersMenu';

export const CatalogPage = () => {

  const server = useServerApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [prods, setProds] = useState([]);

  const [filters, setFilters] = useState<IProductFilters>({
    sort: 'name',
    sortOrder: false,
  });

  const setFilters_cb = useCallback(

    (fields: SetStateAction<IProductFilters>) => 
      setFilters({...filters, ...fields}),
    [filters]

  );

  useEffect(() => { 

    server.GetAllProducts(setProds);
    server.GetAllCategories(setCategories);

  }, []);

  // console.log(prods.map(item => item.));
  console.log(`render ${CatalogPage.name}`);
  console.log(filters);

  return (
    <div className="catalog">
      <CFilterMenu callback={setFilters_cb}/>
      <CFilterProducts callback={setFilters_cb}/>
      <CCategoriesList categories={categories} callback={setFilters_cb}/>
      <CProductList filters={filters} setFilters={setFilters}/>
    </div>
  );

};