import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support'
import { getAllPosts } from '../../businessLogic/posts'

 

export const handler:  APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise <APIGatewayProxyResult>  => {
    const groups = await getAllPosts()
 
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

