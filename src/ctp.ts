import fetch from 'node-fetch';
import {
  ClientBuilder,
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = '{rss-final-task}';
/* eslint-disable */
const scopes = ['{create_anonymous_token:rss-final-task manage_my_business_units:rss-final-task manage_my_quote_requests:rss-final-task view_categories:rss-final-task view_products:rss-final-task manage_my_quotes:rss-final-task view_published_products:rss-final-task manage_my_payments:rss-final-task manage_my_orders:rss-final-task manage_my_shopping_lists:rss-final-task manage_my_profile:rss-final-task}'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: '{yFGtl8U4JfQLq7XyeujB0kuF}',
    clientSecret: '{s-lqKN5QfCMjhZwY8g4s_Myw16m7w86r}',
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
.withProjectKey({ projectKey: '{projectKey}' });  
