import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Categories } from '../models/Categories'

const XAWS = AWSXRay.captureAWS(AWS)

export class BlogAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly blogPostsTable = process.env.POSTS_TABLE) {
  }

  async getAllCategories(): Promise<Categories[]> {
    console.log('Getting all posts')

    const result = await this.docClient.scan({
      TableName: this.blogPostsTable
    }).promise()

    const items = result.Items
    return items as Categories[]
  }

  async createCategory(post: Categories): Promise<Categories> {
    await this.docClient.put({
      TableName: this.blogPostsTable,
      Item: post
    }).promise()

    return post
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
