import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const article = data.articlesResults
  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </Layout>
  )
}

export const query = graphql`
  query($permalink: String!) {
    articlesResults(permalink: { eq: $permalink }) {
      title
      body
    }
  }
`
