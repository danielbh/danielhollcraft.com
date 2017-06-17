---
title: How to get started with AWS Lambda and Serverless
date: 06/17/2017
categories: Node.js, AWS,
summary: Imagine a world where you can have 1 million free API calls, automatic scaling and zero maintenance. It is all possible with Amazon Web Services (AWS) Lambda functions. However getting started can be a bit confusing.
---

Imagine a world where you can have 1 million free API calls, automatic scaling and zero maintenance. It is all possible with Amazon Web Services (AWS) Lambda functions. However getting started can be a bit confusing.

There are a serious of steps you need to follow before executing your first lambda function. It can seem hard, but it's not as hard as you think.

In this blog I will show you how you can easily get started with AWS' "functions as a service" platform. By the time you finish following the instructions in this tutorial, you will have a shiny new lambda function ready to be used in your next project.

***More specifically you will learn...***

1) How to create a lambda function.
2) How to deploy a lambda function from the command line using serverless.
3) How to deploy a lambda function with public and private variables.

***To do this tutorial you will need to...***
1) [Have an aws account](https://www.amazon.com/ap/signin?openid.assoc_handle=aws&openid.return_to=https%3A%2F%2Fsignin.aws.amazon.com%2Foauth%3Fresponse_type%3Dcode%26client_id%3Darn%253Aaws%253Aiam%253A%253A015428540659%253Auser%252Fhomepage%26redirect_uri%3Dhttps%253A%252F%252Fconsole.aws.amazon.com%252Fconsole%252Fhome%253Fregion%253Dus-east-1%2526state%253DhashArgs%252523%2526isauthcode%253Dtrue%26noAuthCookie%3Dtrue&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&action=&disableCorpSignUp=&clientContext=&marketPlaceId=&poolName=&authCookies=&pageId=aws.ssop&siteState=registered%2Cen_US&accountStatusPolicy=P1&sso=&openid.pape.preferred_auth_policies=MultifactorPhysical&openid.pape.max_auth_age=120&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&server=%2Fap%2Fsignin%3Fie%3DUTF8&accountPoolAlias=&forceMobileApp=0&language=en_US&forceMobileLayout=0)
2) Have your own domain name (Optional)
3) [Install Node.js](https://nodejs.org)

### How to Create a Lambda Function

Before I show you how to create a lambda function in your own environment locally I want to show you how to do it in the AWS console. This will give you better context for AWS.

So first you need to sign into the AWS console. Then type on Lambda in the search field under where it says AWS services, and hit enter.

Then press "Create a Lambda Function".

After that you will be presented with the blueprints page. Here there are several pre-made functions that you could use as examples or starter templates. As of June 2017 there is only Python and Node.js runtimes in the blueprint page, but you are able to also use Java (this includes all JVM languages such as clojure and scala) and .NET (C#) if you deploy from the command line. Since I'm a Node guy I use Node.

Now go to where it says "select runtime", and press on `Node.js 6.10`. Then press on "Blank Function."

The next page is where you configure triggers for the function. The options here are many. For example yuu can cause something to be triggered through an HTTP request, when something gets uploaded to S3 (Amazon's cloud storage service) or if something gets pushed to CodeCommit (Amazon's version control repository service). Ideally these are better added with automation through Serverless or CloudFormation (Amazon's infrastructure automated deployment service), so just press next.

Now type whatever you want for "Name" and Description (Optional).

You don't need to change the code just leave it as is.

Scroll down to where it says "Role" and select "Create new role from template(s)" Then under "Role name" type whatever you want.


### How to Deploy a Lambda Function from the Command Line Using Serverless.

### How to Deploy a Lambda Function with Public and Private Variables
