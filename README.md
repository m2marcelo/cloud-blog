# cloud-blog
Capstone for cloud developer nanodegree

Welcome to the capstone project for Cloud developer nanodegree.
The project is a blog, wher you can share content and images.
The division is made by categories, in each category is possible to add posts.

The authentication is done with Auth0.

The project structure is divided in:

- Backend: where is the serverless part. 
   To deploy just run sudo sls deploy -v, but please install the dependencies first (npm install).
- Frontend: where is the client part, made in react.
  To run please first install the dependencies (npm install), then run the client with npm run start
  
There is also a Postman file to test the application, there are 4 variables to fill to test it properly:

- regionId: default is us-west-2 where I added my project
- apiId: the apiId that you get after run the serverless deploy command
- authToken: the authentication token, you can see it in the client, do a login then inspect the page and check the console, it will be there.
- categoryId: after creating a category, just pick the id of it to test it.

To test adding a new blog post, after run the create blog post test, a upload url will be shown in Postman, click on it, change the method from GET to PUT,
change the body to a binary, and choose an image file, then send it. Check the result on the client later.

That's it.
