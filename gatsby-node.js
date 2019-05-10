/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const helpers = require(`./src/lib/helpers`)

exports.createPages = ({ graphql, actions: { createPage } }) => {
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
          console.error(result.errors)
          process.exit(1)
        }

        const articles = helpers.getNodes(result.data, `allArticlesResults`)
        articles.forEach(article => {
          const permalink = article.permalink
          const id = helpers.graphqlLongIdToShort(article.id)
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
