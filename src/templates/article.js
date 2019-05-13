import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { replaceShortcodes } from "../lib/shortcodes"

export default ({ data }) => {
  const article = data.mysqlArticle
  const body = replaceShortcodes(article.article_images, article.body)

  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  )
}

export const query = graphql`
  query($permalink: String!) {
    mysqlArticle(permalink: { eq: $permalink }) {
      title
      body
      article_images {
        id
        caption
        image
        name
      }
    }
  }
`
