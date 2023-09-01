import fetch from 'node-fetch';
import { ClientBuilder, 
  type HttpMiddlewareOptions, 
  AnonymousAuthMiddlewareOptions, 
  PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';


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

export const ctpAnonClient = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withAnonymousSessionFlow({
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
    scopes: SCOPES,
    fetch,
  } as AnonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() 
  .build();

export const apiAnonRoot = createApiBuilderFromCtpClient(ctpAnonClient).withProjectKey({ projectKey: PROJECT_KEY });


export function createUserApiClient(username: string, password: string) {

  const ctpMeClient = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withPasswordFlow({
      host: AUTH_URL,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        user: {
          username: username,
          password: password
        }
      }
    } as PasswordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
    
  return ctpMeClient;

}