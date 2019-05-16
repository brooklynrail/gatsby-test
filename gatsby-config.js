const ConnectionString = require("connection-string")

const getMySQLConnection = () => {
  const cs =
    process.env.DATABASE_URL ||
    `mysql://brooklynrail:devpass@localhost:3307/brooklynrail`
  const conn = new ConnectionString(cs)

  return {
    host: conn.hostname,
    port: conn.port,
    user: conn.user,
    password: conn.password,
    database: conn.path && conn.path[0],
  }
}

const connectionDetails = getMySQLConnection()

const articlesQuery = (select = `*`) => `
  SELECT ${select} FROM articles
  WHERE permalink IS NOT NULL
  ORDER BY created_at DESC
`
const imageSubquery = articlesQuery(`id`)

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
            statement: articlesQuery(),
            idFieldName: `id`,
            name: `article`,
          },
          {
            // exclude dangling images
            statement: `SELECT * FROM article_images WHERE article_id IN (${imageSubquery})`,
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
