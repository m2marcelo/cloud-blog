import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { BlogPost } from '../models/Posts'

const XAWS = AWSXRay.captureAWS(AWS)

export class BlogAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly groupsTable = process.env.GROUPS_TABLE) {
  }

  async getAllPosts(): Promise<BlogPost[]> {
    console.log('Getting all posts')

    const result = await this.docClient.scan({
      TableName: this.groupsTable
    }).promise()

    const items = result.Items
    return items as BlogPost[]
  }

  async createPost(post: BlogPost): Promise<BlogPost> {
    await this.docClient.put({
      TableName: this.groupsTable,
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
