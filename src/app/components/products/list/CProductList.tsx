import { 
  useEffect, 
  useState, 
  useCallback, 
  memo 
} from 'react';
import { IProductListProps } from '../../../utils/types';
import { useServerApi } from '../../../services/useServerApi';
import { useTypedSelector } from '../../../store/hooks/useTypedSelector';
import { checkFilters } from '../../../utils/usefullFuncs';
import { ProductProjection } from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';
import { CProductCard } from '../card/CProductCard';
import { CLoading } from '../../loading/CLoading';

import './CProductList.css';


export const CProductList = memo(({ filters }: IProductListProps) => {

  const server = useServerApi();
  const { products } = useTypedSelector(state => state.products);

  const [page, setPage] = useState(0);
  const [items, setItems] = useState<ProductProjection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSlice = (page: number, arr = products) => {
  
    return arr.slice(page * 5, (page + 1) * 5);

  };

  const fetchData = useCallback(() => {

    if (isLoading) return;
    
    setIsLoading(true);

    const data = getSlice(page);

    setItems((prevItems) => prevItems ? [...prevItems, ...data] : [...data]);
    setPage(prevIdx => prevIdx + 1);
    setIsLoading(false);

  }, [page, isLoading, items]);

  useEffect(() => {

    const handleScroll = () => {

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        
        fetchData();

      }

    };

    window.addEventListener('scroll', handleScroll);
    return () => {

      window.removeEventListener('scroll', handleScroll);

    };

  }, [fetchData]);

  useEffect(() => {

    const queryArgs = checkFilters(filters);

    server.FilterProducts(queryArgs).then((data) => {
      
      setItems(getSlice(0, data));
      setPage(1);

    });
     
  }, [filters]);  


  return (
    <div className="product__wrap">
      <div className="product-list-title">Products ({products.length})</div>
      {
        items.length > 0 ?
          <div className="product-list">
            { items.map((product) => 
              <Link 
                key={ product.id } 
                to={`/catalog/${product.id}`} 
                className="product__link"
              > 
                <CProductCard product={ product }/> 
              </Link>
            )}
          </div>
          :
          <div>No items</div>
      }
    </div>
  );

});