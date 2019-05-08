import React from "react"
import { graphql, Link } from "gatsby"
import striptags from "striptags"

import Layout from "../components/layout"
import SEO from "../components/seo"

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

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <ul>
      {data.allMySqlResults.edges.map(({ node: article }) =>
        renderArticle(article)
      )}
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allMySqlResults(limit: 100) {
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
