import React from "react"
import { graphql } from "gatsby"

import ArticlePreview from "../components/article_preview"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { getNodes } from "../lib/helpers"

const IndexPage = ({ data }) => {
  const articles = getNodes(data, `allArticlesResults`)
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <ul>
        {articles.map(article => (
          <ArticlePreview key={article.id} {...article} />
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allArticlesResults(limit: 100) {
      edges {
        node {
          id
          title
          permalink
        }
      }
    }
  }
`
