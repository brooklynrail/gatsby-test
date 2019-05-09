/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const graphqlLongIdToShort = require(`./src/lib/helpers`).graphqlLongIdToShort

const getNodes = (result, block) => result.data[block].edges.map(e => e.node)

const imagesForArticle = (allImages, article) => {
  const id = graphqlLongIdToShort(article.id)
  return allImages.filter(i => i.article_id === id)
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    const template = path.resolve(`src/templates/article.js`)

    resolve(
      // do queries here instead of per-page
      // https://github.com/gatsbyjs/gatsby/issues/7373
      graphql(`
        {
          allArticlesResults(limit: 100) {
            edges {
              node {
                body
                id
                permalink
                title
              }
            }
          }
          allArticleImagesResults {
            edges {
              node {
                article_id
                id
                caption
                image
                name
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const allArticles = getNodes(result, `allArticlesResults`)
        const allImages = getNodes(result, `allArticleImagesResults`)

        allArticles.forEach(article => {
          const images = imagesForArticle(allImages, article)

          createPage({
            path: article.permalink,
            component: template,
            context: {
              article,
              images,
            },
          })
        })
      })
    )
  })
}
