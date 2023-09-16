import { 
  SetStateAction, 
  useCallback, 
  useEffect, 
  useState 
} from 'react';
import { useServerApi } from '../../services/useServerApi';
import { IProductFilters } from '../../utils/types';
import { ICrumbs } from '../../utils/types';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { useShowMessage } from '../../services/useShowMessage';

import { CCategoriesList } from '../../components/products/categories/CCategoriesList';
import CFilterProducts from '../../components/filters/search/CSearch';
import { CProductList } from '../../components/products/list/CProductList';
import CFilterMenu from '../../components/filters/CFiltersMenu';
import { CLoading } from '../../components/loading/CLoading';
import CBreadcrumbs from '../../components/breadcrumbs/CBreadсrumbs';
import { CSortProducts } from '../../components/products/sort/CSortProducts';

import './CatalogPage.css';
import { msg } from '../../utils/constants';


export const CatalogPage = () => {

  const server = useServerApi();
  const showMessage = useShowMessage();
  const { products, categories, loading } = useTypedSelector(state => state.products);

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

    server.GetAllCategories().catch(() => {

      showMessage(msg.COMMON_ERROR);

    });

  }, []);

  useEffect(() => {

    let c: ICrumbs[] = [];

    c = [{url: '/', name: 'Home'}];
    if (products) {

      c[1] = {url: '', name: 'Catalog'};
    
    }
    setCrumbs(c);
  
  }, [products]);
  
  return (
    (categories.length !== 0) ? 
      <div className="catalog">
        {<CBreadcrumbs crumbs={crumbs}/>}
        <div className="sub-title">Catalog</div>
        <div className="catalog__search">
          <CFilterProducts callback={setFilters_cb}/>
          <CCategoriesList callback={setFilters_cb}/>
        </div>
        <CSortProducts filters={filters} setFilters={setFilters}/>
        <div className="catalog__filters-and-prods">
          {products.length > 0 && <CFilterMenu callback={setFilters_cb} />}
          {!loading ? <CProductList filters={filters} setFilters={setFilters}/> : <CLoading />}
        </div>
      </div>
      :
      <CLoading />
  );

};