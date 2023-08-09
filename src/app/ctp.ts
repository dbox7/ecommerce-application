import fetch from 'node-fetch';
import {
  ClientBuilder,
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

import { 
  createApiBuilderFromCtpClient 
} from '@commercetools/platform-sdk';

const projectKey = 'rss-final-task';
const scopes = ['manage_project:rss-final-task'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: 'WqMoyyfNlL6wt3UPtf-VRde2',
    clientSecret: 'v3QgpGgAMVDPDcGtWmPnz8cphLrAF90X',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: projectKey });  
  