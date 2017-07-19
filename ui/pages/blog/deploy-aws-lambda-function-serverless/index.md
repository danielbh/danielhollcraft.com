---
title: Deploy A Lambda Function with Serverless
date: 07/19/2017
categories: Node.js, AWS,
summary: You’ve written an awesome REST API or GraphQL endpoint and a stellar web UI and you want to deploy it. Then you shudder. There are so many options and you don’t know which to choose.
---

You’ve written an awesome REST API or GraphQL endpoint and a stellar web UI and you want to deploy it. Then you shudder. There are so many options and you don’t know which to choose. If you are looking for a non managed solution maybe you deploy to Next.js, Heroku or AWS Elastic Beanstalk. If you got the chops you deploy to AWS EC2 or Digital Ocean. 

Up until recently I would have said that if it’s a small hobby project or prototype, just deploy it to one of the aforementioned platform as a service (PaaS) options. If it was a project where you were going to need to scale and had in-house DevOps talent then I would have previously said, take the infrastructure as a service (IaaS) route. Now in 2017 my thoughts on the matter have completely changed. 

Enter The Serverless Framework. The Serverless Framework is a open source project that helps with the deployment of serverless cloud architectures. Serverless as in the idea, not the framework, is a new-ish way to develop applications. The main idea is that you can abstract far above the idea of a server which is managed for you, and you pay for the functions you run or the pages you load. With the Serverless Framework, you can deploy cloud assets to either AWS, IBM OpenWisk, Google Cloud, or Azure. Before we go further and to avoid confusion when reading this blog post if I say Serverless from now on, I mean the Serverless Framework.

Let me give quick example of how you would deploy a project with Serverlss. Let’s use the example of a static website. If your preferred Serverless Framework provider was AWS, and you wanted to deploy an API, you would create a configuration file that included the instructions to deploy the website the API. Then you deploy and voila, you have an API in the cloud. It’s that easy.

#### By the end of this blog post you will know how to:

1) Setup a Serverless project
2) Add the project files and code
3) Setup the Serverless configuration file
4) Test the code in the local environment
5) Deploy to the cloud

#### Pre-requistes before getting started

- You must have NPM installed. To get it you need to go to Nodejs.org and download and install it.
- Know how to read Javascript (although you can write functions in Python, C# and JVM compatible languages)
- Have serverless installed. Once you have npm installed just type `npm install -g serverless` in any directory in your terminal
- I will use AWS for this tutorial since it is my preferred cloud provider, so that means you’ll need to install and authenticate the aws-cli. This can be done following the process in the following three links.
    1) [aws-cli installed](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
    2) [AWS user created with programmatic access](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)
    3) [aws-cli authenticated](http://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html) 

### Adding the Project Files and Code

<To get the completed project>

Create the project in a desired location and then add the following files:

Add a file called `handler.js`. This will be the file that contains your lambda function. This lambda function will return your IP address.

````javascript

const https = require('https');


module.exports.helloServerless = (event, context, callback) => {
  const response = {
    statusCode: 200, // 1
    headers: {
      'Access-Control-Allow-Origin': '*',  // 2
    },
    body: JSON.stringify(event.requestContext.identity.sourceIp), //3 
  };

  callback(null, response);
};
````

1) A `200` status code is returned which signals that the function was run successfully
2) This is required to allow Cross Origin Resource Sharing (CORS). Under normal conditions a web page is not allowed to make http requests from an API that does not share the same domain name. This is not a concern for this demo.. <EXPLAIN>
3) This will display your IP address.


Add a filed called `index.html`. This will be the static asset that you deploy as the front-end website for your lambda function. It will display your external IP address.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Hello Serverless</title>
        <script>
            // 1
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState === 4 && this.status === 200) {
                document.getElementById("app").innerHTML = this.responseText // 2
              }
            };
            // 3
            xhttp.open("GET", "http://localhost:3000", true);
            xhttp.send();
        </script>
    
    </head>
    <body>
    <h1 id="app"></h1>
    </body>
</html>

```
1) This is how old people make http requests in the browser.
2) The callback for receiving the external IP address. If the external IP address is successfully received it will print it to the webpage.
3) This is the code that executes the request to your lambda function.


Add `serverless.yml`. This is the configuration file that will configure your cloud infrastructure. If you have never used yaml then you should keep in mind that white spaces do matter. It's basically JSON without brackets, commas, or apostrophes.

A `serverless.yml` template is devided into blocks. Each block as a purpose (see below).

```yaml
# 1
service: hello-serverless

# 2
provider:
  name: aws
  runtime: nodejs6.10
  region: us-east-1

# 3
functions:
  helloWorld:
    handler: handler.helloServerless
    # 4
    events:
      - http:
          path: /
          method: get
          cors: true

# 5
resources:
  Outputs:
    WebSiteUrl:
      Value: {"Fn::GetAtt": [WebSite, WebsiteURL]} # 6
    WebSiteBucket:
      Value: {Ref: WebSite} # 7
  Resources:
    WebSite:
      Type: AWS::S3::Bucket # 8
      Properties:
        WebsiteConfiguration:
          IndexDocument: index.html # 9

plugins:
  - serverless-offline

```

1) The `service` block is the name of the service
2) The `provider` block defines where your service will be deployed
3) The `functions` block defines what code to deploy
4) The `events` block defines how to trigger the handler.helloServerless code
5) The `resources` block defines additional resources to be provisioned. This can include a CloudFront distribution <Explain more>

### Setup the Serverless Configuration File

1) Add the config for handler
2) Add the config for static project
3) Add the config for sls s3 deploy - mention this will be explained later

### Test the code in the local environment

sls offline
sls run static file (to simulate static environment)

### Deploy the Project

1) Talk about stages
2) Deploy with sls deploy 
3) change url after deploy for bucket
3) Deploy s3 static with scripts

    
The next steps…  Serverless can setup your DNS routes to your domain and implement SSL (for free) for all automated once configured. Although you still have to do API Gateway yourself… provide links

Talk about the potential cost savings (1 million api calls)

    
Interested in making a serverless project together? Do you just want to nerd out? Call me!
