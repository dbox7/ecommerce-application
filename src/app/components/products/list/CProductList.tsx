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

import './CProductList.css';


export const CProductList = memo(({ filters }: IProductListProps) => {

  const server = useServerApi();
  const { products } = useTypedSelector(state => state.products);

  const [page, setPage] = useState(0);
  const [items, setItems] = useState<ProductProjection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {

    if (isLoading) return;

    console.log('fetch');
    
    setIsLoading(true);

    const queryArgs = checkFilters(filters, page);

    const data = await server.FilterProducts(queryArgs);

    setItems((prevItems) => prevItems ? [...prevItems, ...data] : [...data]);
    setPage(prevIdx => prevIdx + 1);
    setIsLoading(false);

  }, [page, isLoading]);

  useEffect(() => {

    const handleScroll = () => {

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      
      if (scrollTop + clientHeight >= scrollHeight - 20) {

        console.log('scroll');
        
        fetchData();

      }

    };

    window.addEventListener('scroll', handleScroll);
    return () => {

      window.removeEventListener('scroll', handleScroll);

    };

  }, [fetchData]);

  useEffect(() => {

    const queryArgs = checkFilters(filters, page);

    server.FilterProducts(queryArgs).then((data) => {

      setItems(data);
      setPage(prevIdx => prevIdx + 1);

    });
     
  }, [filters]);  


  return (
    <div className="product__wrap">
      <div className="product-list-title">Products ({products.length})</div>
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
    </div>
  );

});