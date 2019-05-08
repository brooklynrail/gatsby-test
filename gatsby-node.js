/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const template = path.resolve(`src/templates/article.js`)

    resolve(
      graphql(`
        {
          allArticlesResults(limit: 100) {
            edges {
              node {
                permalink
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allArticlesResults.edges.forEach(({ node }) => {
          const permalink = node.permalink
          createPage({
            path: permalink,
            component: template,
            context: {
              permalink,
            },
          })
        })
      })
    )
  })
}
