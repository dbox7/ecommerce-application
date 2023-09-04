import { 
  SetStateAction, 
  useCallback, 
  useEffect, 
  useState 
} from 'react';
import { useServerApi } from '../../services/useServerApi';
import { IProductFilters } from '../../utils/types';
import { Category } from '@commercetools/platform-sdk';
import { ICrumbs } from '../../utils/types';

import { CCategoriesList } from '../../components/products/categories/CCategoriesList';
import CFilterProducts from '../../components/filters/search/CSearch';
import { CProductList } from '../../components/products/list/CProductList';
import CFilterMenu from '../../components/filters/CFiltersMenu';
import { CLoading } from '../../components/loading/CLoading';
import CBreadcrumbs from '../../components/breadcrumbs/CBreadсrumbs';
import { CSortProducts } from '../../components/products/sort/CSortProducts';

import './CatalogPage.css';

export const CatalogPage = () => {

  const server = useServerApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [prods, setProds] = useState([]) as any;
  const [crumbs, setCrumbs] = useState<ICrumbs[]>([]);

  const [filters, setFilters] = useState<IProductFilters>({
    sort: 'name.en asc',
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

  useEffect(() => {

    let c: ICrumbs[] = [];

    c = [{url: '/', name: 'Home'}];
    if (prods) {

      c[1] = {url: '', name: 'Catalog'};
    
    }
    setCrumbs(c);
  
  }, [prods]);
  
  return (
    (prods.length !== 0 && categories.length !== 0) ? 
      <div className="catalog">
        {<CBreadcrumbs crumbs={crumbs}/>}
        <div className="sub-title">Catalog</div>
        <div className="catalog__search">
          <CFilterProducts callback={setFilters_cb}/>
          <CCategoriesList categories={categories} callback={setFilters_cb}/>
        </div>
        <CSortProducts filters={filters} setFilters={setFilters}/>
        <div className="catalog__filters-and-prods">
          <CFilterMenu callback={setFilters_cb} prods={prods} />
          <CProductList filters={filters} setFilters={setFilters}/>
        </div>
      </div>
      :
      <CLoading />
  );

};