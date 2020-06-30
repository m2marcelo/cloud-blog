import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support'
import { getAllCategories } from '../../businessLogic/categories'

export const handler:  APIGatewayProxyHandler = async (): Promise <APIGatewayProxyResult>  => {
    const blogPosts = await getAllCategories()
 
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

