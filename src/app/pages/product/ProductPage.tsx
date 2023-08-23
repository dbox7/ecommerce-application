import { useContext, useEffect, useState } from 'react';
import { apiAnonRoot } from '../../ctp';
import { GlobalContext } from '../../store/GlobalContext';
import { useParams } from 'react-router-dom';
import { ProductVariant } from '@commercetools/platform-sdk';
import CViewImage from '../../components/viewImage/CViewImage';

function GetProduct(id: string) {

  const [globalStore] = useContext(GlobalContext);
  const [product, setProduct] = useState<ProductVariant>();
  const [error, setError] = useState<string>('');

  useEffect(() => {

    let api;

    if (globalStore.currentUser.id) {
  
      api = globalStore.apiMeRoot;
  
    } else {
  
      api = apiAnonRoot;
  
    }
  
    api?.productProjections()
      .withId({ID: id as string})
      .get().execute().then(res => {
        
        setProduct(res.body.masterVariant);
        
      }).catch(err => {
        
        setError(err);
        
      });

  }, []);
  

  return { product, error };
  
}

export function ProductPage() {
 
  const props = useParams();
  
  const product = GetProduct(props.id!).product;  
  
  return ( 
    <div>
      {product &&
      <CViewImage 
        images={product?.images!}
        color={product?.attributes![0].value.key}
      />}
    </div>
  );

};