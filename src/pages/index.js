import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <ul>
      {data.allMySqlResults.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.permalink}>{node.title}</Link>
        </li>
      ))}
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
