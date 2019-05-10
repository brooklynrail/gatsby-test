import React from "react"
import { graphql } from "gatsby"
import { renderToString } from "react-dom/server"
import Layout from "../components/layout"
import { getNodes, graphqlLongIdToShort } from "../lib/helpers"

const imgUrl = img => {
  const id = graphqlLongIdToShort(img.id)
  return `https://brooklynrail-web.imgix.net/article_image/image/${id}/${
    img.image
  }`
}

const elForShortcode = (images, name) => {
  const img = images.find(i => i.name === name)
  if (!img) {
    console.error(`${name} not found.`)
    return null
  }
  const url = imgUrl(img)
  return <img src={url} alt={img.caption} />
}

const replaceShortcodes = (images, body) =>
  body.replace(/!!(\w+)!!/g, (match, shortcode) => {
    const el = elForShortcode(images, shortcode)
    return renderToString(el)
  })

export default ({ data }) => {
  const article = data.articlesResults
  const images = getNodes(data, `allArticleImagesResults`)
  const body = replaceShortcodes(images, article.body)

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
