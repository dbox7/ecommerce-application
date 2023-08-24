import { apiAnonRoot } from '../ctp';
import { GlobalContext } from '../store/GlobalContext';
import { useContext } from 'react';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';


export function useApi(): ByProjectKeyRequestBuilder {
  
  const [globalStore, setGlobalStore] = useContext(GlobalContext);

  let api;

  if (globalStore.currentUser.id && globalStore.apiMeRoot) {

    api = globalStore.apiMeRoot;
  
  } else {
  
    api = apiAnonRoot;
  
  }

  return api;
  
}


