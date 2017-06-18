---
title: How to get started with AWS Lambda and Serverless
date: 06/17/2017
categories: Node.js, AWS,
summary: Imagine a world where you can have 1 million free API calls, automatic scaling and zero maintenance. It is all possible with Amazon Web Services (AWS) Lambda functions. However getting started can be a bit confusing.
---

Imagine a world where you can host an API that receives: 1 million free API calls per month, automatic scaling and zero maintenance. It is all possible with Amazon Web Services (AWS) Lambda functions. However getting started can be a bit confusing.

There are a serious of steps you need to follow before deploying and executing your first lambda function. But it's not as hard as you think.

In this blog I will show you how you can easily get started with AWS' "functions as a service" platform. By the time you finish following the instructions in this tutorial, you will have a shiny new lambda function ready to be used in your next project.

**More specifically you will learn...**

1) How to create a lambda function.
2) How to deploy a lambda function from the command line using Serverless.
3) How to deploy a lambda function with public and private environment variables.

**To do this tutorial you will need to...**
1) Have knowledge of how to read javascript and JSON
2) [Have an aws account](https://www.amazon.com/ap/signin?openid.assoc_handle=aws&openid.return_to=https%3A%2F%2Fsignin.aws.amazon.com%2Foauth%3Fresponse_type%3Dcode%26client_id%3Darn%253Aaws%253Aiam%253A%253A015428540659%253Auser%252Fhomepage%26redirect_uri%3Dhttps%253A%252F%252Fconsole.aws.amazon.com%252Fconsole%252Fhome%253Fregion%253Dus-east-1%2526state%253DhashArgs%252523%2526isauthcode%253Dtrue%26noAuthCookie%3Dtrue&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&action=&disableCorpSignUp=&clientContext=&marketPlaceId=&poolName=&authCookies=&pageId=aws.ssop&siteState=registered%2Cen_US&accountStatusPolicy=P1&sso=&openid.pape.preferred_auth_policies=MultifactorPhysical&openid.pape.max_auth_age=120&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&server=%2Fap%2Fsignin%3Fie%3DUTF8&accountPoolAlias=&forceMobileApp=0&language=en_US&forceMobileLayout=0)
3) Have your own domain name (Optional)
4) [Install Node.js](https://nodejs.org)

### How to Create a Lambda Function

Before I show you how to create a lambda function in your own environment locally I want to show you how to do it in the AWS console. This will give you better context for AWS.

So first you need to sign into the AWS console. Then type on Lambda in the search field under where it says AWS services, and hit enter.

Then press "Create a Lambda Function".

After that you will be presented with the blueprints page. Here there are several pre-made functions that you could use as examples or starter templates. As of June 2017 there is only Python and Node.js runtimes in the blueprint page, but you are able to also use Java (this includes all JVM languages such as clojure and scala) and .NET (C#) if you deploy from the command line. Since I'm a Node guy I use Node.

Now go to where it says "select runtime", and press on `Node.js 6.10`. Then press on "hello-world"

The next page is where you configure triggers for the function. The options here are many. For example yuu can cause something to be triggered through an HTTP request, when something gets uploaded to S3 (Amazon's cloud storage service) or if something gets pushed to CodeCommit (Amazon's version control repository service). Ideally these are better added with automation through Serverless or CloudFormation (Amazon's infrastructure automated deployment service), so just press next.

Now type "hello-lambda" for the function name, and leave the description as is.

Replace the code with the following:

```
'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log("Hello lambda!")
    callback(null, event.key1);  // Echo back the first key value
    //callback('Something went wrong');
};

```

Scroll down to where it says "Role". A role is where you give rights to your function to access other AWS resources such as giving permission to make logs with CloudWatch or to interact with an S3 bucket. A common practice for naming roles, is to name a role based on what the function with this role is doing. If a function is a contact form response then you could call it contact-form-responder. A role can have several "Identity Access Management (IAM) policies" Which are the statements that allow the function to use AWS resources. These are written in JSON. 

```
{
    "Effect": "Allow",
    "Action": "logs:CreateLogGroup",
    "Resource": "arn:aws:logs:us-east-1:123456789012:log-group:my-log-group"
}
```

**Each policy statement has the following**

- **Effect:** either "Allow" or "Deny" which gives access to a resource. Effect is deny by default so you would normally only write "Allow". This seems silly to me, I mean why not just omit it all together, but it's what it says in the AWS Docs...

- **Action:** is what actions will be allowed by the function. In the above example you are giving the function the ability to create new log group. This can then be used to view logs from this function.

- **Resources:** This is which resources you have given the policy access to. In the example above we have given access to to CloudWatch logs. The syntax means: `arn:partition:service:region:account-id:log-group-name`. 

Here are a few great resources for creating roles...

- [AWS docs for IAM Policies](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)
- [AWS docs for Amazon Resource Names](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-cloudwatch-logs)
- [Cloudonaut - a great reference for finding the right policy for your use case](https://iam.cloudonaut.io/reference/index.html#/)

Now time to add a role to our function. Name the role, "lambda-demo". Don't select any policy templates. We will need logs but, by default logs will already be enabled when you create a role.

Now scroll down to where it says Advanced and press on it. Here you define the configuration for your function. Most importantly memory and timeout. 
The main thing to consider here is that beyond your free 1 million API calls per month and and 400,000 GB-seconds of compute time per month, how much you are charged depends on how much memory you add to your function and how long it runs. This can even out though since sometimes since when you increase memory you can decrease the time functions run. Check out the [AWS Lambda pricing page](https://aws.amazon.com/lambda/pricing/) for more information.

Timeout is how long the function can go without calling the callback in the function. Callbacks are required to be called to complete all lambda functions.

Now press "Next" and then "Create function" 

Time to give your new function a test drive...

Press "Test" once your reach the next screen. A modal should pop up. In the field where it says `"key1": "value1"` replace this with `"key1": "my first lambda output!"` Then scroll down and press "Save and test".

After it runs you should see the following in the bottom of the screen...


### How to Deploy a Lambda Function from the Command Line Using Serverless.

### How to Deploy a Lambda Function with Public and Private Variables
