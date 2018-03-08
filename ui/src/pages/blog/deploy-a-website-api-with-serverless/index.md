---
path: /blog/deploy-a-website-api-with-serverless
title: Deploy a Website and API with Serverless
date: 07/19/2017
categories: Node.js, AWS
---

You’ve written an awesome REST API or GraphQL endpoint and a stellar web UI and you want to deploy it. Then you shudder. There are so many options and you don’t know which to choose. If you are looking for a non managed solution maybe you deploy to Next.js, Heroku or AWS Elastic Beanstalk. If you got the chops, you could deploy to AWS EC2 or Digital Ocean.

Up until recently I would have said that if it’s a small hobby project or prototype, just deploy it to one of the aforementioned platform as a service (PaaS) options. If it was a project where you were going to need to scale and had in-house DevOps talent, then I would have previously said, take the infrastructure as a service (IaaS) route. Now in 2017 my thoughts on the matter have completely changed.

Enter [The Serverless Framework](https://serverless.com/framework/docs/)... An open source project that helps with the deployment of serverless cloud infrastructure. Serverless as in the idea, not the framework, is a new-"ish" way to develop applications. The main idea is that you can abstract far above the idea of a server which is managed for you, and you pay for the functions you run or the web pages you load. With the Serverless Framework, you can deploy cloud assets to either AWS, IBM OpenWisk, Google Cloud, or Azure. Before we go further, and to avoid confusion when reading this blog post if I say Serverless from now on, I mean the Serverless Framework.

Let me give quick example of how you would deploy a project with Serverless. Let’s use the example of a static website. If your preferred Serverless Framework provider was AWS, and you wanted to deploy an API, you would create a configuration file that included the instructions to deploy the website the API. Then you include the api code as an exported function, then deploy and voila, you have an API in the cloud. It’s that easy.

#### By the end of this blog post you will know how to:

1) Setup project files and code
2) Setup the Serverless configuration file
3) Test the code in the local environment
4) Deploy to the cloud

#### Pre-requistes before getting started

- You must have Node.js installed. To do this you need to go to [Nodejs.org](nodejs.org) and download it. Be sure to download LTS
- Know how to read JavaScript (although you can write functions in Python, C# and JVM compatible languages)
- An mild familiarity with AWS will be helpful to understanding what's going on.
- Have serverless installed. Once you have npm installed just type `npm install -g serverless` in any directory in your terminal
- I will use AWS for this tutorial since it is my preferred cloud provider, so that means you’ll need to install and authenticate the aws-cli. This can be done by reading through following three articles.
    1) [aws-cli installed](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
    2) [AWS user created with programmatic access](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)
    3) [aws-cli authenticated](http://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html)

### Setting up the Project Files and Code

[You can obtain the completed project here](https://github.com/danielbh/getting-started-with-serverless-tutorial). You will still need to add your Lambda endpoint to `index.html` to make it work.

Create the project in a desired location and then add the following files:

Add a file called `handler.js`. This will be the file that contains your lambda function. This lambda function will return your IP address.

```javascript
module.exports.getIP = (event, context, callback) => {
  const response = {
    statusCode: 200, // 1
    headers: {
      'Access-Control-Allow-Origin': '*',  // 2
    },
    body: JSON.stringify(event.requestContext.identity.sourceIp), //3
  };

  callback(null, response);
};
```

1) A `200` status code is returned which signals that the function was run successfully.
2) This is required to allow Cross Origin Resource Sharing (CORS). Under default conditions a web page is not allowed to make http requests from an API that does not share the same domain name. CORS exists to prevent a security vulnerability called Cross-Site Request Forgery (CSRF). You can [read more about this vulnerability at OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)). For the purposes of this demo, it's not a big deal.
3) This will respond to the request with your IP address.

Now, create a directory called `dist` and add a filed called `index.html`. This will be the static asset that you deploy as the front-end website for your lambda function. It will display your external IP address.

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
1) This is how old people make http requests with javascript in the browser.
2) The callback for receiving the external IP address. If the external IP address is successfully received it will print it to the webpage.
3) This is the code that executes the request to your lambda function.

Now add `404.html`. This will be used when a user requests a page that does not exist.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404 Error</title>
</head>
<body>
    <h1>404 Error: This page does not exist</h1>
</body>
</html>
```

### Setup the Serverless Configuration File

Add `serverless.yml` to the root directory. This is the configuration file that will configure your cloud infrastructure. If you have never used yaml then you should keep in mind that white spaces do matter. It's basically JSON without brackets, commas, or apostrophes.

A `serverless.yml` template is divided into blocks. Each block as a purpose (see below).

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
  #4
  getIP:
    handler: handler.getIP
    # 5
    events:
      - http:
          path: /
          method: get
          cors: true
# 6
resources:
  Outputs: # 7
    WebSiteUrl:
      Value: {"Fn::GetAtt": [WebSite, WebsiteURL]}
    WebSiteBucket:
      Value: {Ref: WebSite}
  Resources:
    WebSite:
      Type: "AWS::S3::Bucket" # 8
      Properties:
        WebsiteConfiguration: # 9
          IndexDocument: index.html # 10
          ErrorDocument: 404.html # 11
```

1) The `service` block is the name of the service
2) The `provider` block defines where your service will be deployed
3) The `functions` block defines what code to deploy. This is where you describe the lambda function you are deploying. This function is called "getIP". It has a handler that uses `handler.getIP` which maps back to the handler.js file.
5) The `events` block defines how to trigger the handler code. It states the path, to call the function, the REST method to use, and whether or not CORS is allowed.
6) The `resources` block defines additional resources to be provisioned. This can include a CloudFront distribution, SSL certifications, DNS mappings etc...
7) When you deploy this project it will create a [Cloud Formation](https://aws.amazon.com/cloudformation/) stack in AWS. The outputs are variables that are created when the Cloud Formation stack has finished initializing. You can access these outputs via an API. In this case we are saving these output urls for later, to deploy the static files with a shell script.
8) This will create an S3 bucket in AWS.
9) This will set the s3 bucket to be a static website mode.
10) This tells AWS where to find the index web page for the site.
11) This tells AWS where to put the "not found" web page for the site.

### Test the code in the local environment

Before deploying, it's nice to see if the code will work in the local environment. The API can be tested by downloading a Serverless plugin and running it. Serverless plugins are used to help the development process of Serverless API's. [Here is a comprehensive list of Serverless plugins](https://github.com/serverless/plugins).

For this project we will use `serverless-offline` to enable offline support. To download it you need to type `npm i serverless-offline --save-dev`. This will add the dependency, and note it in the `package.json` in your root directory. This will help future developers install this project in their local environment.

Now you must add the plugin to `serverless.yml`

```
 ...

 plugins:
    - serverless-offline
```

Now in the root directory type `serverless offline` you can also type `sls offline`.
Now open `index.html`. You should see "127.0.0.1" in the browser. This is your local IP. You will change the API endpoint address in `index.html` later, to point it to the live function.


### Deploy the Project

Now it's time to deploy the tutorial!

 All you need to do is the following in your terminal in the root directory: `sls deploy`.

It will take a few minutes maximum, but when its done it will output the endpoint URL. After its done the terminal output will look close to this...

```bash
danielhollcraft:~/projectDir $ sls deploy
Serverless: Packaging service...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (4.07 MB)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: hello-serverless
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  GET - https://<endpoint-id>.execute-api.us-east-1.amazonaws.com/dev/
...
```

What did it do? It deployed an endpoint on AWS by generating a lambda function and connects the function to the API gateway so you can access it via a REST API. It also created two s3 buckets. One that will hold the web ui code (we'll deploy that next), and one to hold the Cloud Formation template which contains instructions for creating the infrastructure that was just generated. Also included, is a zipped bundle of your endpoint functions that you just deployed.

It should be noted that you deployed to `dev` which means you deployed to a testing endpoint. Of course you could use it for production, but it's encouraged to create another endpoint for production. One for testing, one for production. This is standard development life cycle workflow. To deploy to production you would type `sls deploy --stage <whatever-you-call-production>`

Now it's time to deploy the front end code. You'll need to copy and paste the new endpoint URL of your live lambda function into `index.html`. The endpoint id can be found in the above terminal output. Copy and paste your your own endpoint.

```
endpoints:
  GET - https://<endpoint-id>.execute-api.us-east-1.amazonaws.com/dev/
```

Copy it into the below part of the `index.html` file...

```
 xhttp.open("GET", /*copy it here*/, true);
```

As of July 2017, the shortest and most elegant way to deploy static files to a Serverless project for web rendering, is with bash scripts. I won't explain these too much, but essentially the below scripts will take the Cloud Formation Outputs that we placed in the `serverless.yml`, and it will use this to access the website bucket. By default these scripts will manipulate the dev bucket. You will need to add the stage name if you wish to target a different bucket. This can be done by appending the stage name at the end of the command `. script.sh <name of stage>`.

I recommend you create a directory called `scripts` and add the two scripts in.

`deploy-static-files.sh`
```bash
#!/usr/bin/env bash

set -eu

STAGE="${1:-dev}"
echo "Deploying static assets to ${STAGE}..."

BUCKET_NAME=$(aws \
    cloudformation describe-stacks \
    --stack-name "hello-serverless-${STAGE}" \
    --query "Stacks[0].Outputs[?OutputKey=='WebSiteBucket'] | [0].OutputValue" \
    --output text)

WEBSITE_URL=$(aws \
    cloudformation describe-stacks \
    --stack-name "hello-serverless-${STAGE}" \
    --query "Stacks[0].Outputs[?OutputKey=='WebSiteUrl'] | [0].OutputValue" \
    --output text)

#Deploy site content
aws s3 sync --acl 'public-read' --delete dist "s3://${BUCKET_NAME}/"

echo "Bucket URL: ${WEBSITE_URL}"
```

`delete-static-files.sh`
```bash
#!/usr/bin/env bash

set -eu

STAGE="${1:-dev}"

echo "You are about to DELETE ALL STATIC ASSETS from ${STAGE}"
echo "If that's not what you want, press ctrl-C to kill this script"
echo "Or press enter to continue"

read

echo "Deleting static assets from ${STAGE}..."

BUCKET_NAME=$(aws \
    cloudformation describe-stacks \
    --stack-name "danielhollcraft-${STAGE}" \
    --query "Stacks[0].Outputs[?OutputKey=='WebSiteBucket'] | [0].OutputValue" \
    --output text)

mkdir /tmp/empty

aws s3 sync --delete /tmp/empty/ "s3://${BUCKET_NAME}/"

rmdir /tmp/empty

echo "Bucket ${BUCKET_NAME} has been emptied"
```

You can add commands in the package.json to make calling these scripts easier

```javascript
{

...

 "scripts": {
    "static:deploy": "./scripts/deploy_static_files.sh",
    "static:destroy": "./scripts/delete_static_files.sh"
  }
}
```

Now to deploy your static files type the following in the root directory of your project: `npm run static:deploy`.

The terminal should output the following:

```bash
Deploying static assets to dev...
upload: dist/404.html to s3://hello-serverless-dev-website-uzv5zwnqswdi/404.html
upload: dist/index.html to s3://hello-serverless-dev-website-uzv5zwnqswdi/index.html
Bucket URL: http://hello-serverless-dev-website-<website-id>.s3-website-us-east-1.amazonaws.com
```

Now navigate to the bucket URL. You now have an app that displays your external IP address to a web page!


### Next Steps...

Serverless can also be used to setup the DNS routes to your static webste and implement SSL (for free). You can also setup a CloudFront distributions to cache your static assets for better site performance.

If you'd like to dive deeper with Serverless I recommend the following resources:

- [A Cloud Guru Serverless Bundle Course](https://acloud.guru/bundle/start-serverless): As far as I'm concerned these guys are the best at AWS cloud training out there. I've taken many of their courses, including this bundled course.

- [Serverless Framework Documentation](https://serverless.com/framework/docs/): It's very detailed and useful.

- [Serverless Framework Example Github Respository](https://github.com/serverless/examples): Where you can find many different starting templates for your next Serverless project.


That's a wrap. If you have any more questions, or if you just want to nerd out over Serverless with a cup of coffee, feel free to [contact me](/contact/).
