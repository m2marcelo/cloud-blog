const apiId = '61413a3u8k'
const regionId = 'us-west-2'

export const apiEndpoint = `https://${apiId}.execute-api.${regionId}.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-m2marcelo.eu.auth0.com',            // Auth0 domain
  clientId: 'SoDtAwrIjY9VGA6cghPtJzi7kvQKqiO7',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}

