import fetch from 'node-fetch';
import {
  ClientBuilder,
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

import { 
  ApiRoot,
  createApiBuilderFromCtpClient 
} from '@commercetools/platform-sdk';

export const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
export const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
export const PROJECT_KEY = 'rss-final-task';
export const CLIENT_ID = 'WqMoyyfNlL6wt3UPtf-VRde2';
export const CLIENT_SECRET = 'v3QgpGgAMVDPDcGtWmPnz8cphLrAF90X';
export const SCOPES = ['manage_project:rss-final-task'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes: SCOPES,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(PROJECT_KEY) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: PROJECT_KEY });  
  