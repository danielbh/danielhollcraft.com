module.exports = {
  siteMetadata: {
    title: "Daniel Hollcraft",
    tagline: "Full Stack JavaScript Developer",
    linkedinProfile: "https://www.linkedin.com/in/daniel-hollcraft-752509b/",
    githubProfile: "https://github.com/danielbh",
    googleAnalyticsId:  "UA-40454074-3",
    apiDevelopment: "http://localhost:3000",
    apiProduction: "https://ad87zs9n5f.execute-api.us-east-1.amazonaws.com/prod"
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-sharp`
  ],
};
