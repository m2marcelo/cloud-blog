// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import 'source-map-support'
// import * as AWS from 'aws-sdk'

// const docClient = new AWS.DynamoDB.DocumentClient()
// const groupsTable = process.env.GROUPS_TABLE
 

// export const handler:  APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise <APIGatewayProxyResult>  => {
//     // TODO implement
//     const result = await docClient.scan({ // Call parameters
//       TableName: groupsTable
//      }).promise()
     
//     const items = result.Items 
 
//     const response = {
//         statusCode: 200,
//         headers: {
//             "Access-Control-Allow-Origin": '*'
//         },
//         body: JSON.stringify({ items })
//     };
//     return response;
// };

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support'
import { getAllGroups } from '../../businessLogic/groups'

 

export const handler:  APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise <APIGatewayProxyResult>  => {
    const groups = await getAllGroups()
 
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": '*'
        },
        body: JSON.stringify({ 
            items: groups 
        })
    };
};

