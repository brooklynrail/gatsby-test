import React from "react"
import { graphql } from "gatsby"
import { renderToString } from "react-dom/server"
import Layout from "../components/layout"
import { graphqlLongIdToShort } from "../lib/helpers"

export default ({ data }) => {
  const article = data.articlesResults
  const images = data.allArticleImagesResults.edges.map(i => i.node)

  let body = article.body
  body = body.replace(/!!(\w+)!!/g, (match, name) => {
    const img = images.find(i => i.name === name)
    const id = graphqlLongIdToShort(img.id)
    const url = `https://brooklynrail-web.imgix.net/article_image/image/${id}/${
      img.image
    }`
    const el = <img src={url} alt={img.caption} />
    return renderToString(el)
  })

  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  )
}

export const query = graphql`
  query($id: Int!, $permalink: String!) {
    articlesResults(permalink: { eq: $permalink }) {
      title
      body
    }
    allArticleImagesResults(filter: { article_id: { eq: $id } }) {
      edges {
        node {
          id
          caption
          image
          name
        }
      }
    }
  }
`
