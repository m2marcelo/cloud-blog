import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const docClient = new XAWS.DynamoDB.DocumentClient()

const blogPostsTable = process.env.POSTS_TABLE
const imagesTable = process.env.IMAGES_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Caller event', event)
  const category = event.pathParameters.category
  const validCategory = await categoryExists(category)

  if (!validCategory) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'This category does not exists'
      })
    }
  }

  const posts = await getPostsPerCategory(category)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: posts
    })
  }
}

async function categoryExists(category: string) {
  const result = await docClient
    .get({
      TableName: blogPostsTable,
      Key: {
        id: category
      }
    })
    .promise()

  console.log('categoryExists result = ', result)
  return !!result.Item
}

async function getPostsPerCategory(category: string) {
  const result = await docClient.query({
    TableName: imagesTable,
    KeyConditionExpression: 'category = :category',
    ExpressionAttributeValues: {
      ':category': category
    },
    ScanIndexForward: false
  }).promise()

  return result.Items
}
