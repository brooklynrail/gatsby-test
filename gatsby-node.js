/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const graphqlLongIdToShort = require(`./src/lib/helpers`).graphqlLongIdToShort

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
                id
                permalink
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const allArticles = result.data.allArticlesResults.edges.map(
          e => e.node
        )
        allArticles.forEach(article => {
          const permalink = article.permalink
          const id = graphqlLongIdToShort(article.id)
          createPage({
            path: permalink,
            component: template,
            context: {
              id,
              permalink,
            },
          })
        })
      })
    )
  })
}
