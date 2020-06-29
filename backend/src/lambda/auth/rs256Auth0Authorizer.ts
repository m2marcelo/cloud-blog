
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `-----BEGIN CERTIFICATE-----
MIIDDzCCAfegAwIBAgIJCWX7ABu6drhLMA0GCSqGSIb3DQEBCwUAMCUxIzAhBgNV
BAMTGmRldi1tMm1hcmNlbG8uZXUuYXV0aDAuY29tMB4XDTIwMDYxMDE3NDg0MVoX
DTM0MDIxNzE3NDg0MVowJTEjMCEGA1UEAxMaZGV2LW0ybWFyY2Vsby5ldS5hdXRo
MC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDG+WMKLG6K0a5a
i3CIIlkKW807RekWMuHSLgnwu2GxsmKdoKwFb/Ufa/DnujKflfLrlSYSBC4CFtHo
38WsED+34FdfK8dBdsQda0DQQFz9SDZc/GbdGggghTa6h60LAS2c2308EAX3Dati
kYh6s+4D0DNP4+C1q20Tx5hoYGN7mILqDIZD1N3KJ9TarTV73ACxlRCbhidXfSdY
YUeF0PieAVxjwm5vHpTsKThlevnbpW+LZGsEsDThdLa9G43Zf5QyUSf0r3WzxAUX
7Xtamt3yEH/arnMXU/P1Q4tDKtMAGjUbrVPBa4HK7vCKsc/3+NX4kjGYRpD99MH+
5gcDAApdAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFE6PuKJ/
gW64WMy628I+/3ZvbRm8MA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOC
AQEAfAlRQmgB+N30+GpJADpygEN3wTIMC6ADYRCS44ZuXrdsUAxL6wUTwvbKrBF2
XfbHmDknDhpugKXm/81L6ey+t9HkVK8rwyYmvFOkWK87YPXnvHexT1Jz9fAak9n1
oR/BDg55HhGqbjfXejJALHKa2VJjXYPmxWCVCU+4HUOyMJ05/4OwctwWjvremc3o
IlKV0C+XmHUMZ7pyCxeNuQOOkRVlbjYALmGgPZ1qKl7tD2tNBn/fHHK77YwuVfeQ
xqTDtG35ALdvbRq0Bb2rMB3YQ1tFbSLjab75Z0oB+FCGuAg/7o3AQN0kysixXn2j
aOCjG+Vb3qGQfjfKkysJQl1PPw==
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
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
    console.log('User authorized', e.message)

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
}

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}
