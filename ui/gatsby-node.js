/**
 * Created by danielhollcraft on 6/21/17.
 */
exports.modifyWebpackConfig = function(config, stage) {

  // Workaround to get canvas to build with with webpack
  if(stage === "build-html") {
    config._config.externals ='canvas';
  }

  return config
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pages = [];
    const blogPost = path.resolve("src/templates/blog-post.js");
    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug, // required
            component: blogPost,
            context: {
              slug: edge.node.fields.slug,
            },
          });
        });

        return;
      })
    );
  });
};

const path = require("path");

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  let slug;
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug });
  }
}
