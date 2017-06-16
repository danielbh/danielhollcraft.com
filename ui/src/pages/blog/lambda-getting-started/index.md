---
title: Getting Started with AWS Lambda and Serverless
date: 06/14/2017
categories: Node.js, AWS,
summary: '"Functions as a service" (FaaS) are the next big thing for back-end development. Gone are the times where you are required to, provision, deploy, and maintain your web server. AWS, Google, and Microsoft all provide this...'
---
"Functions as a service" (FaaS) are the next big thing for back-end development. Gone are the times where you are required to, provision, deploy, and maintain your web server. AWS, Google, and Microsoft all provide this. For AWS they are called "Lambda Functions", Google: "Cloud Functions",  and for Microsoft "Azure Functions". In this blog entry I will focus on AWS Lambda.

AWS provides two options for deploying, through the AWS console, and the command line. If you would like to add external dependencies that aren't included in your language of choice or aws libraries, you will need to upload a zipped file. This can be done manually or with the command line. The command line tool is nice, but there is an easier way.

_Enter Serverless..._

Serverless is in essence and command line toolchain for simplifying the creation and deployment of Cloud Formation templates. Cloud Formation templates are basically recipes for provisioning different AWS resources Lambda Functions, CDNs, API Gateways, SSL certificates, etc... Although you can do almost anything you do with Serverless with the AWS cli. Serverless makes it much easier and succint. Also Serverless allows you to use other cloud providers besides Amazon to provision infrastructure should you decide to. AWS however is the most mature. 

**Here are the reasons you should consider using AWS Lambda with Serverless:**

1) EASY DEPLOYMENT: After some initial setup Serverless allows you to add a small config file and a script. Then with a quick command you can deploy to the cloud.

2) VERY INEXPENSIVE: Using AWS Lambda will be free for the first 1 million API calls. <HERE EXPLAIN MORE ABOUT PRICING AND HOW IT WORKS>
 
3) EASY TO MAINTAIN: You don't even have to do it.

4) EASY TO SCALE: Unlimited scaling through Amazon.

**In this blog I will explain to you:**

1) How to deploy a lambda function with AWS cli so you can see how it is.

2) How to deploy a lambda function with Serverless to see how much nicer it is.

In both instances I will use an example of an contact form API endpoint so that you can get an idea of how it all works from a practical point of view.

**What you will need to know going into this**

1) A basic understanding of Node.js

2) An AWS account

3) A Mailgun account

4) A domain name that you own. You can create a subdomain too.

