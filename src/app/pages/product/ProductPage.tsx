import { useContext, useEffect, useState } from 'react';
import { apiAnonRoot } from '../../ctp';
import { GlobalContext } from '../../store/GlobalContext';
import { Params, useParams } from 'react-router-dom';
import { ProductVariant } from '@commercetools/platform-sdk';
import CViewImage from '../../components/viewImage/CViewImage';

function GetProduct(props: Params<string>, setProduct: Function): void {

  const [globalStore] = useContext(GlobalContext);

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
  
}

export function ProductPage() {
 
  const props = useParams();
  const [product, setProduct] = useState<ProductVariant>();
  
  GetProduct(props, setProduct);  
  
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