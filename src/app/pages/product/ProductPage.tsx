import { useContext, useEffect, useState } from 'react';
import { apiAnonRoot } from '../../ctp';
import { GlobalContext } from '../../store/GlobalContext';
import { useParams } from 'react-router-dom';
import { ProductVariant } from '@commercetools/platform-sdk';

export function ProductPage() {

  const [globalStore] = useContext(GlobalContext);
  const [product, setProduct] = useState<ProductVariant>();
  const props = useParams();

  console.log(props.id);
  
  useEffect(() => {

    let api;

    if (globalStore.currentUser.id) {

      api = globalStore.apiMeRoot;

    } else {

      api = apiAnonRoot;

    }

    api?.productProjections()
      .withId({ID: props.id as string})
      .get().execute().then(res => {
        
        setProduct(res.body.masterVariant);
        
      }).catch(err => {
        
        console.log(err);
        
      });

  }, [props]);

  

  return ( 
    <div>
      <img src={product?.images![0].url} alt="boot" />
    </div>
  );

};