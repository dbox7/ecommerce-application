import fetch from 'node-fetch';
import { ClientBuilder, 
  type HttpMiddlewareOptions} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client } from '@commercetools/sdk-client-v2';
import { TokenCache, TokenStore, TokenCacheOptions } from '@commercetools/sdk-client-v2';


export const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
export const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
export const PROJECT_KEY = 'rss-final-task';
export const CLIENT_ID = 'WqMoyyfNlL6wt3UPtf-VRde2';
export const CLIENT_SECRET = 'v3QgpGgAMVDPDcGtWmPnz8cphLrAF90X';
export const SCOPES = ['manage_project:rss-final-task'];

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  fetch,
};

class MyTokenCache implements TokenCache {

  _store: TokenStore;
  
  static DEFAULT = {
    token: '',
    expirationTime: 0,
    refreshToken: ''

  };

  constructor() {

    this._store = MyTokenCache.DEFAULT;

  }

  get(tokenCacheOptions?: TokenCacheOptions): TokenStore {

    return this._store;

  }

  set(cache: TokenStore, tokenCacheOptions?: TokenCacheOptions): void {

    if(cache.refreshToken) {

      localStorage.rToken = cache.refreshToken;

    }

    this._store = cache;

  }

  clear() {

    this._store = MyTokenCache.DEFAULT;

  }

}
const tokenCache = new MyTokenCache();

export class Api {

  static _anonClientCache?: Client;
  static DEBUG = true;

  private static log(txt: string) {

    if (Api.DEBUG) {

      console.log('Api: %s', txt);

    }

  }

  /**
   * Возвращает API Client. Если в localStorage был Refresh Token, то создаст клиента с
   * RefreshTokenFlow, а если не было — то анонимного.
   */
  static get client() {

    if (!localStorage.rToken) {

      if (!Api._anonClientCache) {

        Api.log('Creating Anonymous client');
        Api._anonClientCache = new ClientBuilder().withProjectKey(PROJECT_KEY)
          .withAnonymousSessionFlow({
            host: AUTH_URL,
            projectKey: PROJECT_KEY,
            credentials: {
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
            },
            scopes: SCOPES,
            fetch,
            tokenCache: tokenCache
          })
          .withHttpMiddleware(httpMiddlewareOptions)
          .build();

      } else {

        Api.log('Re-using Anonymous client');

      }
      return Api._anonClientCache;
      

    } else {

      Api.log(`Creating Refresh Token Client (${localStorage.rToken})`);
      return new ClientBuilder().withProjectKey(PROJECT_KEY)
        .withRefreshTokenFlow({
          host: AUTH_URL,
          projectKey: PROJECT_KEY,
          credentials: {
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
          },
          refreshToken: localStorage.rToken,
          fetch,
          tokenCache: tokenCache
        })
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    }

  }

  /**
   * Создаёт и возвращает API-клиента с Password Flow
   */
  static passwordClient(email: string, password: string) {

    Api.log('Creating Password client');
    return new ClientBuilder().withProjectKey(PROJECT_KEY)
      .withPasswordFlow({
        host: AUTH_URL,
        projectKey: PROJECT_KEY,
        credentials: {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          user: {
            username: email,
            password: password
          }
        },
        tokenCache: tokenCache
      })
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();

  }

  static get root() {

    return createApiBuilderFromCtpClient(Api.client).withProjectKey({ projectKey: PROJECT_KEY });

  }

  static passwordRoot(email: string, password: string) {

    return createApiBuilderFromCtpClient(Api.passwordClient(email, password)).withProjectKey({ projectKey: PROJECT_KEY });
  
  }

  static expireAnonClient() {

    Api._anonClientCache = undefined;
    // Нужно почистить кэш токенов тоже, потому что новое создание клиента с password flow авторизацией
    // не пересоздаст refresh token и он не запомнится
    tokenCache.clear();

  }

}

