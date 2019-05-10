import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { getNodes } from "../lib/helpers"
import { replaceShortcodes } from "../lib/shortcodes"

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
