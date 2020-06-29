// import { CustomAuthorizerEvent, CustomAuthorizerResult, CustomAuthorizerHandler } from 'aws-lambda'
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'

import 'source-map-support/register'
// import * as AWS from 'aws-sdk'
import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

import * as middy from 'middy'
import { secretsManager } from 'middy/middlewares'

// const auth0Secret = process.env.AUTH_0_SECRET
const secretId = process.env.AUTH_0_SECRET_ID
const secretField = process.env.AUTH_0_SECRET_FIELD

// const client =  new AWS.SecretsManager()

// let cachedSecret: string 

// export const handler: CustomAuthorizerHandler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  export const handler = middy(async (
    event: CustomAuthorizerEvent, context): Promise<CustomAuthorizerResult> => {

  try {
        console.log('event = ', event.authorizationToken)
        // verifyToken(event.authorizationToken)
        // const decodedToken = verifyToken(event.authorizationToken)
        // const decodedToken = await verifyToken(event.authorizationToken)
        const decodedToken = verifyToken(
          event.authorizationToken, 
          context.AUTH0_SECRET[secretField]
        )

        console.log('User was authorized', decodedToken)

        return {
            principalId: decodedToken.sub,
            policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                Action: 'execute-api:Invoke',
                Effect: 'Allow',
                Resource: '*'
                }
              ]
            }
          }
        } catch (e) {
        console.log('User was not authorized', e.message)

        return {
            principalId: 'user',
            policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                Action: 'execute-api:Invoke',
                Effect: 'Deny',
                Resource: '*'
                }
              ]
            }
          }
        }
    })
    
    // function verifyToken(authHeader: string, secret: string): JwtToken {
    // function verifyToken(authHeader: string) {
// function verifyToken(authHeader: string): JwtToken {
// async  function verifyToken(authHeader: string): Promise<JwtToken> {
  function verifyToken(authHeader: string, secret: string): JwtToken {

      if (!authHeader) {
        console.log('No authorization header authHeader = ', authHeader)
        throw new Error('No authorization header')
      }
        
    
      if (!authHeader.toLowerCase().startsWith('bearer ')) {
        console.log('Invalid authorization header = ', authHeader.toLowerCase())
        throw new Error('Invalid authorization header')

      }
        
    
      const split = authHeader.split(' ')
      const token = split[1]

      console.log('token = ', token)

      // const secretObject: any = await getSecret()
      // const secret = secretObject[secretField]

      return verify(token, secret) as JwtToken


      // return verify(token, auth0Secret) as JwtToken


    //   if (token !== '123') {
    //     console.log('Invalid token = ', token)
    //     throw new Error('Invalid token')
    //   }
      
    // //   return verify(token, secret) as JwtToken
  }

// async function getSecret() {
//     if (cachedSecret)
//       return cachedSecret

//     const data =  await client
//       .getSecretValue({
//         SecretId: secretId
//       })
//       .promise()

//       cachedSecret = data.SecretString

//       return JSON.parse(cachedSecret)
// }

handler.use(
  secretsManager({
    cache: true,
    cacheExpiryInMillis: 60000,
    // Throw an error if can't read the secret
    throwOnFailedCall: true,
    secrets: {
      AUTH0_SECRET: secretId
    }
  })
)