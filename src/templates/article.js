import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const article = data.mySqlResults
  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
    </Layout>
  )
}

export const query = graphql`
  query($permalink: String!) {
    mySqlResults(permalink: { eq: $permalink }) {
      title
    }
  }
`
