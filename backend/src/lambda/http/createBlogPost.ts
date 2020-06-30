import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)


const docClient = new XAWS.DynamoDB.DocumentClient()
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})

const blogPostsTable = process.env.POSTS_TABLE
const imagesTable = process.env.IMAGES_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const category = event.pathParameters.category
  const validcategory = await categoryExists(category)

  if (!validcategory) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'This blog category does not exists, please create it first.'
      })
    }
  }

  const imageId = uuid.v4()
  const newItem = await createBlogPost(category, imageId, event)

  const url = getUploadUrl(imageId)

  return {
    statusCode: 201,
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)

async function categoryExists(category: string) {
  const result = await docClient
    .get({
      TableName: blogPostsTable,
      Key: {
        id: category
      }
    })
    .promise()

  console.log('categoryExists results= ', result)
  return !!result.Item
}

async function createBlogPost(category: string, imageId: string, event: any) {
  const timestamp = new Date().toISOString()
  const newImage = JSON.parse(event.body)

  const newItem = {
    category,
    timestamp,
    imageId,
    ...newImage,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
  }
  console.log('Storing new item: ', newItem)

  await docClient
    .put({
      TableName: imagesTable,
      Item: newItem
    })
    .promise()

  return newItem
}

function getUploadUrl(imageId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: urlExpiration
  })
}
