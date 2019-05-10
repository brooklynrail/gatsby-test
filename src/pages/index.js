import React from "react"
import { graphql, Link } from "gatsby"
import striptags from "striptags"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { getNodes } from "../lib/helpers"

const renderArticle = article => {
  const title = striptags(article.title)
  return (
    <li key={article.id}>
      <Link
        to={article.permalink}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </li>
  )
}

const IndexPage = ({ data }) => {
  const articles = getNodes(data, `allArticlesResults`)
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <ul>{articles.map(article => renderArticle(article))}</ul>
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
