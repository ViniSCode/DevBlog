import * as prismic from '@prismicio/client';

export function getPrismicClient (req) {
  const client = prismic.createClient( 
    process.env.REACT_APP_PRISMIC_ENDPOINT, 
    {
      req,
      accessToken: process.env.REACT_APP_PRISMIC_ACCESS_TOKEN,
    }
  );

  return client;
}
 