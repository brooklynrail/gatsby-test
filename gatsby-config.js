const connectionDetails = {
  host: `localhost`,
  user: `brooklynrail`,
  password: `devpass`,
  database: `brooklynrail`,
  port: 3307,
}

const numArticles = process.env.NUM_ARTICLES || "100"
const articlesQuery = `
  SELECT * FROM articles
  WHERE permalink IS NOT NULL
  ORDER BY created_at DESC
  LIMIT ${numArticles}
`

module.exports = {
  siteMetadata: {
    title: `Brooklyn Rail`,
    description: `Test of using Gatsby for rendering.`,
    author: `@brooklynrail`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails,
        queries: [
          {
            statement: articlesQuery,
            idFieldName: `id`,
            name: `article`,
          },
          {
            statement: `SELECT * FROM article_images`,
            idFieldName: `id`,
            name: `article_image`,
            parentName: `article`,
            foreignKey: `article_id`,
            cardinality: `OneToMany`,
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
