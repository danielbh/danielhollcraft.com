# danielhollcraft.com powered by gatsbyjs and serverless

### Purpose

This the repo for danielhollcraft.com. It could also be used as a template for a freelancer/consultant personal blog. It includes an "about me" as the main page, a portfolio page, services page, blog, and contact form. It uses [gatsby.js](https://github.com/gatsbyjs/gatsby) for the user interface. For the back-end API it uses [serverless](serverless.com). The deployment of the UI and API are both managed by Serverless and the [aws-cli](https://aws.amazon.com/cli/). 

### Pre-requistes

1) [An Amazon Web Services (AWS) account](https://www.amazon.com/ap/signin?openid.assoc_handle=aws&openid.return_to=https%3A%2F%2Fsignin.aws.amazon.com%2Foauth%3Fresponse_type%3Dcode%26client_id%3Darn%253Aaws%253Aiam%253A%253A015428540659%253Auser%252Fhomepage%26redirect_uri%3Dhttps%253A%252F%252Fconsole.aws.amazon.com%252Fconsole%252Fhome%253Fregion%253Dus-east-1%2526state%253DhashArgs%252523%2526isauthcode%253Dtrue%26noAuthCookie%3Dtrue&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&action=&disableCorpSignUp=&clientContext=&marketPlaceId=&poolName=&authCookies=&pageId=aws.ssop&siteState=registered%2Cen_US&accountStatusPolicy=P1&sso=&openid.pape.preferred_auth_policies=MultifactorPhysical&openid.pape.max_auth_age=120&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&server=%2Fap%2Fsignin%3Fie%3DUTF8&accountPoolAlias=&forceMobileApp=0&language=en_US&forceMobileLayout=0)
2) [aws-cli installed](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
3) [AWS user created with programmatic access](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)
4) [aws-cli authenticated](http://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html) 
5) [Node.js installed](https://nodejs.org/en/)
5) [serverless installed](https://serverless.com/framework/docs/getting-started/)
6) [gatbsy.js installed](https://github.com/gatsbyjs/gatsby)
7) [Mailgun account with a verified domain (recommended)](https://mailgun.com)

### Top level commands

All commands must be used in the root file directory.

- `setup`: Install UI and API dependencies.
- `static:deploy:prod`: Deploy local UI build to production.
- `static:destroy:prod`: Destroy deployed UI production build.
- `static:destroy:local`: Destroy local UI production build.
- `static:build`: Build UI locally.
- `static:build:deploy`: Build and deploy UI.
- `ui:local`: Start UI server locally.
- `ui:deploy:prod`: Deploy UI production infrastructure.
- `api:deploy:prod`: Deploy back-end production infrastructure.
- `api:local`: Run local back-end API server.
      

### Web UI

To create the front-end I used the library [gatsby.js](https://github.com/gatsbyjs/gatsby) for static content generation. The reason I prefer gatsby.js as a static generation lib is because it uses [React.js](https://github.com/facebook/react) and I love to React! I use gatsby.js instead of vanilla React because it simplifies development in many ways. Very notably it generates routes through the filesystem. For example if I wanted a top level React component to be the main template for `/blog`, I create a folder in `ui/pages/blog` and then `/blog` will route to that top level component. It's the best part of PHP **WITHOUT** PHP!
 
The website uses [SCSS](http://sass-lang.com/) for a CSS pre-processor.

It is deployed using [serverless](https://serverless.com/). While you can use Amazon Web Services (AWS), Azure, IBM Open Wisk, or Google Cloud for serverless deployments, I used AWS since it is the most mature and best IMHO. Please see [ui/serverless.yml](https://github.com/danielbh/danielhollcraft.com/blob/master/ui/serverless.yml) to see the deployment configuration for the UI. If you are confused about how to create, read, and use `serverless.yml` files, here are a few resources:

- [acloud.guru](https://acloud.guru) where I received most of my education about serverless.
- [serverless docs](https://serverless.com/framework/docs/providers/aws/guide/intro/)

#### To Deploy:

1) Install pre-requisites 
3) You must have a registered domain name that points to AWS name servers.
4) Go to [ui/serverless.yml](https://github.com/danielbh/danielhollcraft.com/blob/master/ui/serverless.yml) and change the following to match the attributes for your project
   - `custom.rootDomain`
   - `custom.devDomains`
   - `custom.prodDomains`
   - `provider.region`
   
   As for everything else in the file I recommend that only advanced users modify it.
5) Deploy UI infrastructure with `ui:deploy:prod`
6) Build the UI with `static:build`
7) Deploy static build to S3 `static:deploy:prod`

### API

The API is deployed with [serverless](serverless.com). The API only contains one function that is an [AWS Lambda](https://aws.amazon.com/lambda/) function. The function serves as a submit function for the contact form. It takes the submitted form data and sends it to AWS Lambda which then sends the message via [Mailgun](https://mailgun.com) to a specified environmentally configured variable e-mail address. Please see [ui/serverless.yml](https://github.com/danielbh/danielhollcraft.com/blob/master/api/serverless.yml) to see the deployment configuration for the API. 
