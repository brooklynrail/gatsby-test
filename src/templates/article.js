import React from "react"
import { renderToString } from "react-dom/server"
import Layout from "../components/layout"
import { graphqlLongIdToShort } from "../lib/helpers"

const imgUrl = img => {
  const id = graphqlLongIdToShort(img.id)
  return `https://brooklynrail-web.imgix.net/article_image/image/${id}/${
    img.image
  }`
}

const elForShortcode = (images, name) => {
  const img = images.find(i => i.name === name)
  if (!img) {
    console.error(`${name} not found.`)
    return null
  }
  const url = imgUrl(img)
  return <img src={url} alt={img.caption} />
}

const replaceShortcodes = (images, body) =>
  body.replace(/!!(\w+)!!/g, (match, shortcode) => {
    const el = elForShortcode(images, shortcode)
    return renderToString(el)
  })

export default ({ pageContext: { article, images } }) => {
  const body = replaceShortcodes(images, article.body)

  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  )
}
