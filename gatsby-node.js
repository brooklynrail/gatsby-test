/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const helpers = require(`./src/lib/helpers`)

const numArticles = process.env.NUM_ARTICLES || "100"

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    const template = path.resolve(`src/templates/article.js`)

    resolve(
      graphql(`
        {
          allMysqlArticle(limit: ${numArticles}) {
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
          console.error(result.errors)
          process.exit(1)
        }

        const articles = helpers.getNodes(result.data, `allMysqlArticle`)
        articles.forEach(article => {
          const permalink = article.permalink
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
