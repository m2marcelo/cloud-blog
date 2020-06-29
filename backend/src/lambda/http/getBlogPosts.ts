import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support'
import { getAllPosts } from '../../businessLogic/posts'

export const handler:  APIGatewayProxyHandler = async (): Promise <APIGatewayProxyResult>  => {
    const blogPosts = await getAllPosts()
 
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": '*'
        },
        body: JSON.stringify({ 
            items: blogPosts 
        })
    };
};

